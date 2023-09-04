import { use } from 'react';

import getSupabaseServerClient from '~/core/supabase/server-client';
import AdminGuard from '~/app/admin/components/AdminGuard';
import ImpersonateUserConfirmationModal from '~/app/admin/users/@modal/[uid]/components/ImpersonateUserConfirmationModal';

interface Params {
  params: {
    uid: string;
  };
}

function ImpersonateUserModalPage({ params }: Params) {
  const client = getSupabaseServerClient({ admin: true });
  const { data, error } = use(client.auth.admin.getUserById(params.uid));

  if (!data || error) {
    throw new Error(`User not found`);
  }

  return <ImpersonateUserConfirmationModal user={data.user} />;
}

export default AdminGuard(ImpersonateUserModalPage);
