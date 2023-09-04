import { ArrowLeftIcon } from '@heroicons/react/24/outline';

import AppContainer from '~/app/dashboard/[organization]/components/AppContainer';
import Button from '~/core/ui/Button';
import Heading from '~/core/ui/Heading';

function AdminHeader({ children }: React.PropsWithChildren) {
  return (
    <div className="flex items-center justify-between border-b border-gray-50 dark:border-dark-700">
      <AppContainer>
        <div className={'flex w-full justify-between items-center'}>
          <div>
            <Heading type={3}>{children}</Heading>
          </div>

          <Button color={'transparent'} href={'/dashboard'}>
            <span className={'flex space-x-2.5 items-center'}>
              <ArrowLeftIcon className={'w-4 h-4'} />

              <span>Back to Dashboard</span>
            </span>
          </Button>
        </div>
      </AppContainer>
    </div>
  );
}

export default AdminHeader;
