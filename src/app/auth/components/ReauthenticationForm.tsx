import OAuthProviders from '~/app/auth/components/OAuthProviders';
import EmailPasswordSignInContainer from '~/app/auth/components/EmailPasswordSignInContainer';

const ReauthenticationForm: React.FC<{
  onSuccess: EmptyCallback;
}> = ({ onSuccess }) => {
  return (
    <div className={'flex flex-col space-y-4'}>
      <OAuthProviders />
      <EmailPasswordSignInContainer onSignIn={onSuccess} />
    </div>
  );
};

export default ReauthenticationForm;
