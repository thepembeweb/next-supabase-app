import ArrowLeftIcon from '@heroicons/react/24/outline/ArrowLeftIcon';

import SettingsTile from '~/app/dashboard/[organization]/settings/components/SettingsTile';
import InviteMembersForm from '~/app/dashboard/[organization]/settings/organization/components/InviteMembersForm';
import Trans from '~/core/ui/Trans';
import Button from '~/core/ui/Button';
import { withI18n } from '~/i18n/with-i18n';

export const metadata = {
  title: 'Invite Members',
};

const OrganizationMembersInvitePage = () => {
  return (
    <>
      <SettingsTile
        heading={<Trans i18nKey={'organization:inviteMembersPageHeading'} />}
        subHeading={
          <Trans i18nKey={'organization:inviteMembersPageSubheading'} />
        }
      >
        <InviteMembersForm />
      </SettingsTile>

      <div className={'mt-4'}>
        <GoBackToMembersButton />
      </div>
    </>
  );
};

export default withI18n(OrganizationMembersInvitePage);

function GoBackToMembersButton() {
  return (
    <Button size={'small'} color={'transparent'} href={'../members'}>
      <span className={'flex items-center space-x-1'}>
        <ArrowLeftIcon className={'h-3'} />

        <span>
          <Trans i18nKey={'organization:goBackToMembersPage'} />
        </span>
      </span>
    </Button>
  );
}
