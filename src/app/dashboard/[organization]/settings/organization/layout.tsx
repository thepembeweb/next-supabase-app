import OrganizationSettingsTabs from '~/app/dashboard/[organization]/settings/organization/components/OrganizationSettingsTabs';
import SettingsContentContainer from '~/app/dashboard/[organization]/settings/components/SettingsContentContainer';
import initializeServerI18n from '~/i18n/i18n.server';
import getLanguageCookie from '~/i18n/get-language-cookie';
import { withI18n } from '~/i18n/with-i18n';

async function OrganizationSettingsLayout({
  children,
  params,
}: React.PropsWithChildren<{
  params: {
    organization: string;
  };
}>) {
  await initializeServerI18n(getLanguageCookie());

  return (
    <>
      <div>
        <OrganizationSettingsTabs organizationId={params.organization} />
      </div>

      <SettingsContentContainer>{children}</SettingsContentContainer>
    </>
  );
}

export default withI18n(OrganizationSettingsLayout);
