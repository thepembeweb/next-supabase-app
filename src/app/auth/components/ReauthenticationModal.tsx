import { useCallback } from 'react';
import Trans from '~/core/ui/Trans';

import Modal from '~/core/ui/Modal';
import ReauthenticationForm from '~/app/auth/components/ReauthenticationForm';

const ReauthenticationModal: React.FC<{
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}> = ({ isOpen, setIsOpen }) => {
  const onSuccess = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  return (
    <Modal
      heading={<Trans i18nKey={'auth:reauthenticate'} />}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      closeButton={false}
    >
      <div className={'my-4'}>
        <p>
          <Trans i18nKey={'auth:reauthenticateDescription'} />
        </p>
      </div>

      <ReauthenticationForm onSuccess={onSuccess} />
    </Modal>
  );
};

export default ReauthenticationModal;
