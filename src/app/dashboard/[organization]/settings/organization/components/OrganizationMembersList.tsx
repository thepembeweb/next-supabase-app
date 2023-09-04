'use client';

import Trans from '~/core/ui/Trans';
import type { User } from '@supabase/gotrue-js';
import { useMemo } from 'react';

import If from '~/core/ui/If';
import Badge from '~/core/ui/Badge';
import RoleBadge from './RoleBadge';

import { canUpdateUser } from '~/lib/organizations/permissions';
import OrganizationMembersActionsContainer from './OrganizationMembersActionsContainer';
import type UserData from '~/core/session/types/user-data';
import type MembershipRole from '~/lib/organizations/types/membership-role';
import ProfileAvatar from '~/components/ProfileAvatar';
import useUserId from '~/core/hooks/use-user-id';

function OrganizationMembersList({
  members,
}: React.PropsWithChildren<{
  members: Array<{
    role: MembershipRole;
    membershipId: number;
    auth: User;
    data: UserData;
  }>;
}>) {
  const currentUserId = useUserId();

  const currentUser = useMemo(() => {
    return members.find((member) => {
      return member.auth.id === currentUserId;
    });
  }, [currentUserId, members]);

  if (!currentUser) {
    return null;
  }

  const userRole = currentUser.role;

  return (
    <div className={'w-full space-y-10'}>
      <div className="flex flex-col divide-y divide-gray-100 dark:divide-dark-800">
        {members.map((member) => {
          const displayName = member.data.displayName
            ? member.data.displayName
            : member.auth.email;

          const memberId = member.auth.id;
          const isCurrentUser = currentUserId === memberId;

          // check if user has the permissions to update another member of
          // the organization. If it returns false, the actions' dropdown
          // should be disabled
          const shouldEnableActions = canUpdateUser(userRole, member.role);
          const key = `${memberId}:${userRole}`;

          return (
            <div
              key={key}
              data-cy={'organization-member'}
              className={
                'flex flex-col py-2 lg:flex-row lg:items-center lg:space-x-2' +
                ' justify-between space-y-2 lg:space-y-0'
              }
            >
              <div className={'flex flex-auto items-center space-x-4'}>
                <ProfileAvatar text={displayName} />

                <div className={'block truncate text-sm'}>{displayName}</div>

                <If condition={isCurrentUser}>
                  <Badge size={'small'}>
                    <Trans i18nKey={'organization:youBadgeLabel'} />
                  </Badge>
                </If>
              </div>

              <div className={'flex items-center justify-end space-x-4'}>
                <div>
                  <RoleBadge role={member.role} />
                </div>

                <OrganizationMembersActionsContainer
                  disabled={!shouldEnableActions}
                  targetMember={member}
                  currentUserRole={userRole}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default OrganizationMembersList;
