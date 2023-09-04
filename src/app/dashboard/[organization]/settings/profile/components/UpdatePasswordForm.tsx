'use client';

import { useCallback, useEffect } from 'react';
import type { User } from '@supabase/gotrue-js';

import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';

import useUpdateUserMutation from '~/core/hooks/use-update-user-mutation';

import Button from '~/core/ui/Button';
import TextField from '~/core/ui/TextField';
import Alert from '~/core/ui/Alert';
import If from '~/core/ui/If';
import Trans from '~/core/ui/Trans';
import configuration from '~/configuration';

const UpdatePasswordForm: React.FCC<{ user: User }> = ({ user }) => {
  const { t } = useTranslation();
  const updateUserMutation = useUpdateUserMutation();

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      repeatPassword: '',
    },
  });

  const errors = formState.errors;

  const newPasswordControl = register('newPassword', {
    value: '',
    required: true,
    minLength: {
      value: 6,
      message: t(`auth:passwordLengthError`),
    },
    validate: (value) => {
      // current password cannot be the same as the current one
      if (value === getValues('currentPassword')) {
        return t(`profile:passwordNotChanged`);
      }
    },
  });

  const repeatPasswordControl = register('repeatPassword', {
    value: '',
    required: true,
    minLength: {
      value: 6,
      message: t(`profile:passwordLengthError`),
    },
    validate: (value) => {
      // new password and repeat new password must match
      if (value !== getValues('newPassword')) {
        return t(`profile:passwordNotMatching`);
      }
    },
  });

  const updatePasswordFromCredential = useCallback(
    async (password: string) => {
      const redirectTo = [
        window.location.origin,
        configuration.paths.authCallback,
      ].join('');

      const promise = updateUserMutation.trigger({ password, redirectTo });

      return await toast.promise(promise, {
        success: t(`profile:updatePasswordSuccess`),
        error: t(`profile:updatePasswordError`),
        loading: t(`profile:updatePasswordLoading`),
      });
    },
    [updateUserMutation, t]
  );

  const updatePasswordCallback = useCallback(
    async (user: User, currentPassword: string, newPassword: string) => {
      const email = user.email;

      // if the user does not have an email assigned, it's possible they
      // don't have an email/password factor linked, and the UI is out of sync
      if (!email) {
        return Promise.reject(t(`profile:cannotUpdatePassword`));
      }

      try {
        return await updatePasswordFromCredential(newPassword);
      } catch (e) {
        return Promise.reject(e);
      }
    },
    [updatePasswordFromCredential, t]
  );

  const onSubmit = useCallback(
    async (params: { currentPassword: string; newPassword: string }) => {
      const { newPassword, currentPassword } = params;

      return updatePasswordCallback(user, currentPassword, newPassword);
    },
    [user, updatePasswordCallback]
  );

  // reset form on success
  useEffect(() => {
    if (updateUserMutation.data) {
      reset();
    }
  }, [reset, updateUserMutation]);

  const { isMutating, data } = updateUserMutation;

  return (
    <form data-cy={'update-password-form'} onSubmit={handleSubmit(onSubmit)}>
      <div className={'flex flex-col space-y-4'}>
        <If condition={data}>
          <Alert type={'success'}>
            <Alert.Heading>
              <Trans i18nKey={'profile:updatePasswordSuccess'} />
            </Alert.Heading>

            <Trans i18nKey={'profile:updatePasswordSuccessMessage'} />
          </Alert>
        </If>

        <TextField>
          <TextField.Label>
            <Trans i18nKey={'profile:newPassword'} />

            <TextField.Input
              data-cy={'new-password'}
              required
              type={'password'}
              {...newPasswordControl}
            />

            <TextField.Error
              data-cy={'new-password-error'}
              error={errors.newPassword?.message}
            />
          </TextField.Label>
        </TextField>

        <TextField>
          <TextField.Label>
            <Trans i18nKey={'profile:repeatPassword'} />

            <TextField.Input
              data-cy={'repeat-new-password'}
              required
              type={'password'}
              {...repeatPasswordControl}
            />

            <TextField.Error
              data-cy={'repeat-password-error'}
              error={errors.repeatPassword?.message}
            />
          </TextField.Label>
        </TextField>

        <div>
          <Button className={'w-full md:w-auto'} loading={isMutating}>
            <Trans i18nKey={'profile:updatePasswordSubmitLabel'} />
          </Button>
        </div>
      </div>
    </form>
  );
};

export default UpdatePasswordForm;
