import { use } from 'react';

import AppContainer from '~/app/dashboard/[organization]/components/AppContainer';
import AdminHeader from '~/app/admin/components/AdminHeader';
import AdminGuard from '~/app/admin/components/AdminGuard';
import AdminDashboard from '~/app/admin/components/AdminDashboard';
import getSupabaseServerClient from '~/core/supabase/server-client';

import configuration from '~/configuration';

export const metadata = {
  title: `Admin | ${configuration.site.siteName}`,
};

function AdminPage() {
  const data = use(loadData());

  return (
    <div className={'flex flex-col flex-1'}>
      <AdminHeader>Admin</AdminHeader>

      <AppContainer>
        <AdminDashboard data={data} />
      </AppContainer>
    </div>
  );
}

export default AdminGuard(AdminPage);

async function loadData() {
  const client = getSupabaseServerClient({ admin: true });

  const { count: usersCount } = await client.from('users').select('*', {
    count: 'exact',
    head: true,
  });

  const { count: organizationsCount } = await client
    .from('organizations')
    .select('*', {
      count: 'exact',
      head: true,
    });

  const { count: activeSubscriptions } = await client
    .from('subscriptions')
    .select(`*`, {
      count: 'exact',
      head: true,
    })
    .eq('status', 'active');

  const { count: trialSubscriptions } = await client
    .from('subscriptions')
    .select(`*`, {
      count: 'exact',
      head: true,
    })
    .eq('status', 'trialing');

  return {
    usersCount: usersCount || 0,
    organizationsCount: organizationsCount || 0,
    activeSubscriptions: activeSubscriptions || 0,
    trialSubscriptions: trialSubscriptions || 0,
  };
}
