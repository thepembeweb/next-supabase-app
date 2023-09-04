import { useCallback, useContext, useState } from 'react';
import Image from 'next/image';
import { useParams, usePathname, useRouter } from 'next/navigation';

import { PlusCircleIcon } from '@heroicons/react/24/outline';
import { SelectArrow } from '@radix-ui/react-select';

import type Organization from '~/lib/organizations/types/organization';
import useUserOrganizationsQuery from '~/lib/organizations/hooks/use-user-organizations-query';

import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectSeparator,
  SelectGroup,
  SelectAction,
  SelectLabel,
  SelectValue,
} from '~/core/ui/Select';

import If from '~/core/ui/If';
import Trans from '~/core/ui/Trans';

import UserSessionContext from '~/core/session/contexts/user-session';
import CreateOrganizationModal from './CreateOrganizationModal';
import type MembershipRole from '~/lib/organizations/types/membership-role';
import useCurrentOrganization from '~/lib/organizations/hooks/use-current-organization';
import configuration from '~/configuration';

const OrganizationsSelector = () => {
  const [isOrganizationModalOpen, setIsOrganizationModalOpen] = useState(false);
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const changeOrganization = useChangeOrganization();

  const organization = useCurrentOrganization();
  const { userSession } = useContext(UserSessionContext);

  const userId = userSession?.data?.id as string;
  const selectedOrganizationId = organization?.uuid;

  const { data, isLoading } = useUserOrganizationsQuery(userId);

  return (
    <>
      <Select
        open={isSelectOpen}
        value={selectedOrganizationId}
        onOpenChange={setIsSelectOpen}
        onValueChange={(uuid) => changeOrganization(uuid)}
      >
        <SelectTrigger
          data-cy={'organization-selector'}
          className={'!bg-transparent !h-9'}
        >
          <span
            className={'max-w-[5rem] text-sm lg:max-w-[12rem] lg:text-base'}
          >
            <OrganizationItem organization={organization} />

            <span hidden>
              <SelectValue />
            </span>
          </span>
        </SelectTrigger>

        <SelectContent position={'popper'}>
          <SelectArrow />

          <SelectGroup>
            <SelectLabel>Your Organizations</SelectLabel>

            <SelectSeparator />

            <OrganizationsOptions organizations={data ?? []} />

            <If condition={isLoading}>
              <SelectItem value={selectedOrganizationId ?? ''}>
                <OrganizationItem organization={organization} />
              </SelectItem>
            </If>
          </SelectGroup>

          <SelectSeparator />

          <SelectGroup>
            <SelectAction
              onClick={() => {
                setIsSelectOpen(false);
                setIsOrganizationModalOpen(true);
              }}
            >
              <span
                data-cy={'create-organization-button'}
                className={'flex flex-row items-center space-x-2 truncate'}
              >
                <PlusCircleIcon className={'h-5'} />

                <span>
                  <Trans
                    i18nKey={'organization:createOrganizationDropdownLabel'}
                  />
                </span>
              </span>
            </SelectAction>
          </SelectGroup>
        </SelectContent>
      </Select>

      <CreateOrganizationModal
        setIsOpen={setIsOrganizationModalOpen}
        isOpen={isOrganizationModalOpen}
      />
    </>
  );
};

function OrganizationsOptions(
  props: React.PropsWithChildren<{
    organizations: Array<{
      organization: Organization;
      role: MembershipRole;
    }>;
  }>,
) {
  return (
    <>
      {props.organizations.map(({ organization }) => {
        return (
          <SelectItem
            data-cy={`organization-selector-${organization.name}`}
            value={organization.uuid}
            key={organization.uuid}
          >
            <OrganizationItem organization={organization} />
          </SelectItem>
        );
      })}
    </>
  );
}

function OrganizationItem({
  organization,
}: {
  organization: Maybe<Organization>;
}) {
  const imageSize = 18;

  if (!organization) {
    return null;
  }

  const { logoURL, name } = organization;

  return (
    <span
      data-cy={'organization-selector-item'}
      className={`flex max-w-[12rem] items-center space-x-2`}
    >
      <If condition={logoURL}>
        <span className={'flex items-center'}>
          <Image
            style={{
              width: imageSize,
              height: imageSize,
            }}
            width={imageSize}
            height={imageSize}
            alt={`${name} Logo`}
            className={'object-contain'}
            src={logoURL as string}
          />
        </span>
      </If>

      <span className={'w-auto truncate text-sm font-medium'}>{name}</span>
    </span>
  );
}

export default OrganizationsSelector;

function useChangeOrganization() {
  const path = usePathname();
  const params = useParams();
  const router = useRouter();

  return useCallback(
    (uuid: string) => {
      const appPrefix = configuration.paths.appPrefix;
      const organizationPath = `${appPrefix}/${uuid}`;
      const route = path?.replace(`${appPrefix}/${params?.organization}`, '');

      if (route !== undefined) {
        router.push(`${organizationPath}/${route}`);
      }
    },
    [params?.organization, path, router],
  );
}
