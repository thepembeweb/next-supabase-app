'use client';

import { UserPlusIcon } from '@heroicons/react/24/outline';

import useUserCanInviteUsers from '~/lib/organizations/hooks/use-user-can-invite-users';
import Button from '~/core/ui/Button';
import Trans from '~/core/ui/Trans';

function InviteMembersLinkButton(
  props: React.PropsWithChildren<{
    href: string;
  }>
) {
  const canInviteUsers = useUserCanInviteUsers();

  if (!canInviteUsers) {
    return null;
  }

  return (
    <Button
      size={'small'}
      className={'w-full lg:w-auto'}
      data-cy={'invite-form-link'}
      type="button"
      href={props.href}
    >
      <span className="flex items-center space-x-2">
        <UserPlusIcon className="h-5" />

        <span>
          <Trans i18nKey={'organization:inviteMembersButtonLabel'} />
        </span>
      </span>
    </Button>
  );
}

export default InviteMembersLinkButton;
