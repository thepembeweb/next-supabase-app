'use client';

import { useCallback, useContext, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import type { SupabaseClient } from '@supabase/supabase-js';

import OrganizationContext from '~/lib/contexts/organization';
import useUpdateOrganizationMutation from '~/lib/organizations/hooks/use-update-organization-mutation';

import Button from '~/core/ui/Button';
import TextField from '~/core/ui/TextField';
import ImageUploadInput from '~/core/ui/ImageUploadInput';
import Label from '~/core/ui/Label';
import Trans from '~/core/ui/Trans';

import useSupabase from '~/core/hooks/use-supabase';
import type Organization from '~/lib/organizations/types/organization';

const UpdateOrganizationForm = () => {
  const client = useSupabase();

  const { organization, setOrganization } = useContext(OrganizationContext);
  const updateOrganizationMutation = useUpdateOrganizationMutation();
  const { t } = useTranslation('organization');

  const currentOrganizationName = organization?.name ?? '';
  const currentLogoUrl = organization?.logoURL || null;

  const { register, handleSubmit, reset, setValue } = useForm({
    defaultValues: {
      name: currentOrganizationName,
      logoURL: currentLogoUrl,
    },
  });

  const onSubmit = useCallback(
    async (organizationName: string, logoFile: Maybe<File>) => {
      const organizationId = organization?.id;

      if (!organizationId) {
        const errorMessage = t(`updateOrganizationErrorMessage`);

        return toast.error(errorMessage);
      }

      const logoName = logoFile?.name;

      let logoURL: string | null | undefined;

      // if the logo is provided and differs from the existing one
      // upload it to the storage
      if (logoName && logoName !== currentLogoUrl) {
        logoURL = await uploadLogo({
          client,
          logo: logoFile,
          organizationId,
        }).catch(() => {
          toast.error(t(`updateLogoErrorMessage`));

          return null;
        });
      }

      if (!logoName && currentLogoUrl) {
        // if the user removed the logo
        logoURL = null;
      }

      const organizationData: WithId<Partial<Organization>> = {
        id: organization.id,
        name: organizationName,
      };

      if (logoURL !== undefined) {
        organizationData.logoURL = logoURL;
      }

      const promise = updateOrganizationMutation.trigger(organizationData);

      await toast.promise(promise, {
        loading: t(`updateOrganizationLoadingMessage`),
        success: t(`updateOrganizationSuccessMessage`),
        error: t(`updateOrganizationErrorMessage`),
      });

      setOrganization({
        ...organization,
        name: organizationName,
        logoURL: logoURL ?? organization.logoURL,
      });
    },
    [
      organization,
      client,
      currentLogoUrl,
      updateOrganizationMutation,
      t,
      setOrganization,
    ]
  );

  useEffect(() => {
    reset({
      name: organization?.name,
      logoURL: organization?.logoURL,
    });
  }, [organization, reset]);

  const nameControl = register('name', {
    required: true,
  });

  const logoControl = register('logoURL');

  return (
    <form
      onSubmit={handleSubmit((value) => {
        return onSubmit(value.name, getLogoFile(value.logoURL));
      })}
      className={'space-y-4'}
    >
      <div className={'flex flex-col space-y-4'}>
        <TextField>
          <TextField.Label>
            <Trans i18nKey={'organization:organizationNameInputLabel'} />

            <TextField.Input
              {...nameControl}
              data-cy={'organization-name-input'}
              required
              placeholder={'ex. IndieCorp'}
            />
          </TextField.Label>
        </TextField>

        <Label>
          <Trans i18nKey={'organization:organizationLogoInputLabel'} />

          <ImageUploadInput
            {...logoControl}
            multiple={false}
            image={currentLogoUrl}
            onClear={() => setValue('logoURL', '')}
          >
            <Trans i18nKey={'common:imageInputLabel'} />
          </ImageUploadInput>
        </Label>

        <div>
          <Button
            className={'w-full md:w-auto'}
            data-cy={'update-organization-submit-button'}
            loading={updateOrganizationMutation.isMutating}
          >
            <Trans i18nKey={'organization:updateOrganizationSubmitLabel'} />
          </Button>
        </div>
      </div>
    </form>
  );
};

/**
 * @description Upload file to Storage
 * @param client
 * @param organizationId
 * @param logo
 */
async function uploadLogo({
  client,
  organizationId,
  logo,
}: {
  client: SupabaseClient;
  organizationId: number;
  logo: File;
}) {
  const bytes = await logo.arrayBuffer();
  const bucket = client.storage.from('logos');
  const fileName = getLogoName(logo.name, organizationId);

  const result = await bucket.upload(fileName, bytes, {
    upsert: true,
    contentType: logo.type,
  });

  if (!result.error) {
    return bucket.getPublicUrl(fileName).data.publicUrl;
  }

  throw result.error;
}

function getLogoName(fileName: string, organizationId: number) {
  const extension = fileName.split('.').pop();

  return `${organizationId}.${extension}`;
}

function getLogoFile(value: string | null | FileList) {
  if (!value) {
    return;
  }

  if (typeof value === 'string') {
    return new File([], value);
  }

  return value.item(0) ?? undefined;
}

export default UpdateOrganizationForm;
