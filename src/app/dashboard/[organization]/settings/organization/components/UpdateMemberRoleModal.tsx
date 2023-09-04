import { useCallback, useState, useTransition } from 'react';
import Trans from '~/core/ui/Trans';

import Button from '~/core/ui/Button';
import Modal from '~/core/ui/Modal';

import type MembershipRole from '~/lib/organizations/types/membership-role';
import MembershipRoleSelector from '~/app/dashboard/[organization]/settings/organization/components/MembershipRoleSelector';
import { updateMemberAction } from '~/lib/memberships/actions';
import useCsrfToken from '~/core/hooks/use-csrf-token';

const Heading = <Trans i18nKey={'organization:updateMemberRoleModalHeading'} />;

const UpdateMemberRoleModal: React.FCC<{
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  membershipId: number;
  memberRole: MembershipRole;
}> = ({ isOpen, setIsOpen, memberRole, membershipId }) => {
  const [role, setRole] = useState<MembershipRole>(memberRole);
  const [isSubmitting, startTransition] = useTransition();
  const csrfToken = useCsrfToken();

  const onRoleUpdated = useCallback(async () => {
    if (role !== undefined) {
      startTransition(async () => {
        await updateMemberAction({ membershipId, role, csrfToken });

        setIsOpen(false);
      });
    }
  }, [csrfToken, membershipId, role, setIsOpen]);

  return (
    <Modal heading={Heading} isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className={'flex flex-col space-y-6'}>
        <MembershipRoleSelector value={role} onChange={setRole} />

        <div className={'flex justify-end space-x-2'}>
          <Modal.CancelButton onClick={() => setIsOpen(false)} />

          <Button
            data-cy={'confirm-update-member-role'}
            variant={'flat'}
            loading={isSubmitting}
            onClick={onRoleUpdated}
          >
            <Trans i18nKey={'organization:updateRoleSubmitLabel'} />
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default UpdateMemberRoleModal;
