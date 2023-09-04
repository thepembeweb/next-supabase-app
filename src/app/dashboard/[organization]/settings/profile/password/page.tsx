import UpdatePasswordFormContainer from '~/app/dashboard/[organization]/settings/profile/components/UpdatePasswordFormContainer';
import SettingsTile from '~/app/dashboard/[organization]/settings/components/SettingsTile';
import Trans from '~/core/ui/Trans';
import { withI18n } from '~/i18n/with-i18n';

export const metadata = {
  title: 'Update Password',
};

const ProfilePasswordSettingsPage = () => {
  return (
    <SettingsTile
      heading={<Trans i18nKey={'profile:passwordTab'} />}
      subHeading={<Trans i18nKey={'profile:passwordTabSubheading'} />}
    >
      <UpdatePasswordFormContainer />
    </SettingsTile>
  );
};

export default withI18n(ProfilePasswordSettingsPage);
