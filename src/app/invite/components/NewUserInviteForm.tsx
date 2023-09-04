'use client';

import { useCallback, useState, useTransition } from 'react';

import EmailLinkAuth from '~/app/auth/components/EmailLinkAuth';
import OAuthProviders from '~/app/auth/components/OAuthProviders';
import PhoneNumberSignInContainer from '~/app/auth/components/PhoneNumberSignInContainer';
import EmailPasswordSignInContainer from '~/app/auth/components/EmailPasswordSignInContainer';
import EmailPasswordSignUpContainer from '~/app/auth/components/EmailPasswordSignUpContainer';

import If from '~/core/ui/If';
import Button from '~/core/ui/Button';
import Trans from '~/core/ui/Trans';
import Alert from '~/core/ui/Alert';

import configuration from '~/configuration';
import PageLoadingIndicator from '~/core/ui/PageLoadingIndicator';
import isBrowser from '~/core/generic/is-browser';
import useCsrfToken from '~/core/hooks/use-csrf-token';
import { acceptInviteAction } from '~/lib/memberships/actions';

enum Mode {
  SignUp,
  SignIn,
}

function NewUserInviteForm(
  props: React.PropsWithChildren<{
    code: string;
  }>,
) {
  const [mode, setMode] = useState<Mode>(Mode.SignUp);
  const [isSubmitting, startTransition] = useTransition();
  const [verifyEmail, setVerifyEmail] = useState(false);
  const csrfToken = useCsrfToken();

  const oAuthReturnUrl = isBrowser() ? window.location.pathname : '';

  const onInviteAccepted = useCallback(
    async (userId?: string) => {
      startTransition(async () => {
        const shouldVerifyEmail = await acceptInviteAction({
          code: props.code,
          userId,
          csrfToken,
        });

        setVerifyEmail(shouldVerifyEmail);
      });
    },
    [csrfToken, props.code],
  );

  if (verifyEmail) {
    return (
      <Alert type={'success'}>
        <Alert.Heading>
          <Trans i18nKey={'auth:emailConfirmationAlertHeading'} />
        </Alert.Heading>

        <Trans i18nKey={'auth:emailConfirmationAlertBody'} />
      </Alert>
    );
  }

  return (
    <>
      <If condition={isSubmitting}>
        <PageLoadingIndicator fullPage>
          Accepting invite. Please wait...
        </PageLoadingIndicator>
      </If>

      <OAuthProviders returnUrl={oAuthReturnUrl} />

      <If condition={configuration.auth.providers.emailPassword}>
        <If condition={mode === Mode.SignUp}>
          <div className={'flex w-full flex-col items-center space-y-4'}>
            <EmailPasswordSignUpContainer onSubmit={onInviteAccepted} />

            <Button
              block
              color={'transparent'}
              size={'small'}
              onClick={() => setMode(Mode.SignIn)}
            >
              <Trans i18nKey={'auth:alreadyHaveAccountStatement'} />
            </Button>
          </div>
        </If>

        <If condition={mode === Mode.SignIn}>
          <div className={'flex w-full flex-col items-center space-y-4'}>
            <EmailPasswordSignInContainer onSignIn={onInviteAccepted} />

            <Button
              block
              color={'transparent'}
              size={'small'}
              onClick={() => setMode(Mode.SignUp)}
            >
              <Trans i18nKey={'auth:doNotHaveAccountStatement'} />
            </Button>
          </div>
        </If>
      </If>

      <If condition={configuration.auth.providers.phoneNumber}>
        <PhoneNumberSignInContainer
          onSuccess={onInviteAccepted}
          mode={'signUp'}
        />
      </If>

      <If condition={configuration.auth.providers.emailLink}>
        <EmailLinkAuth inviteCode={props.code} />
      </If>
    </>
  );
}

export default NewUserInviteForm;
