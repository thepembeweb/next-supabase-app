'use client';

import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import type { User } from '@supabase/gotrue-js';

import Modal from '~/core/ui/Modal';
import Button from '~/core/ui/Button';
import { banUser } from '~/app/admin/users/@modal/[uid]/actions';
import useCsrfToken from '~/core/hooks/use-csrf-token';

function BanUserModal({
  user,
}: React.PropsWithChildren<{
  user: User;
}>) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);
  const [pending, startTransition] = useTransition();
  const csrfToken = useCsrfToken();
  const displayText = user.email ?? user.phone ?? '';

  const onDismiss = () => {
    router.back();

    setIsOpen(false);
  };

  const onConfirm = () => {
    startTransition(async () => {
      await banUser({
        userId: user.id,
        csrfToken,
      });

      onDismiss();
    });
  };

  return (
    <Modal heading={'Ban User'} isOpen={isOpen} setIsOpen={onDismiss}>
      <div className={'flex flex-col space-y-4'}>
        <div className={'flex flex-col space-y-2 text-sm'}>
          <p>
            You are about to ban <b>{displayText}</b>.
          </p>

          <p>
            You can unban them later, but they will not be able to log in or use
            their account until you do.
          </p>

          <p>Are you sure you want to do this?</p>
        </div>

        <div className={'flex space-x-2.5 justify-end'}>
          <Modal.CancelButton disabled={pending} onClick={onDismiss}>
            Cancel
          </Modal.CancelButton>

          <Button
            loading={pending}
            variant={'flat'}
            color={'danger'}
            onClick={onConfirm}
          >
            Yes, ban user
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default BanUserModal;
