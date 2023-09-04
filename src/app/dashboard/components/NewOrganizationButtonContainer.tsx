'use client';

import { useState } from 'react';

import { PlusIcon } from '@heroicons/react/24/outline';
import CardButton from '~/core/ui/CardButton';

import CreateOrganizationModal from '~/app/dashboard/[organization]/components/organizations/CreateOrganizationModal';
import CsrfTokenContext from '~/lib/contexts/csrf';

function NewOrganizationButtonContainer({
  csrfToken,
}: React.PropsWithChildren<{
  csrfToken: string;
}>) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <CsrfTokenContext.Provider value={csrfToken}>
      <CardButton onClick={() => setIsOpen(true)}>
        <span className={'flex items-center space-x-4'}>
          <PlusIcon className={'h-6 w-6'} />

          <span className={'text-base font-medium'}>
            Create a new organization
          </span>
        </span>
      </CardButton>

      <CreateOrganizationModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </CsrfTokenContext.Provider>
  );
}

export default NewOrganizationButtonContainer;
