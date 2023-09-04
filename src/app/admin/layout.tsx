import { redirect } from 'next/navigation';
import { cookies, headers } from 'next/headers';

import isUserSuperAdmin from '~/app/admin/utils/is-user-super-admin';
import AdminSidebar from '~/app/admin/components/AdminSidebar';
import getLanguageCookie from '~/i18n/get-language-cookie';
import AdminProviders from '~/app/admin/components/AdminProviders';

async function AdminLayout({ children }: React.PropsWithChildren) {
  const isAdmin = await isUserSuperAdmin();
  const language = getLanguageCookie();

  if (!isAdmin) {
    redirect('/');
  }

  const csrfToken = headers().get('X-CSRF-Token');
  const collapsed = cookies().get('sidebarCollapsed')?.value === 'true';

  return (
    <AdminProviders
      csrfToken={csrfToken}
      collapsed={collapsed}
      language={language}
    >
      <div className={'flex'}>
        <AdminSidebar />

        {children}
      </div>
    </AdminProviders>
  );
}

export default AdminLayout;
