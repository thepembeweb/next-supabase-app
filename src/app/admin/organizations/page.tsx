import { use } from 'react';
import { redirect } from 'next/navigation';

import AppContainer from '~/app/dashboard/[organization]/components/AppContainer';
import AdminHeader from '~/app/admin/components/AdminHeader';
import AdminGuard from '~/app/admin/components/AdminGuard';
import OrganizationsTable from '~/app/admin/organizations/components/OrganizationsTable';
import { getOrganizations } from '~/app/admin/organizations/queries';
import getPageFromQueryParams from '~/app/admin/utils/get-page-from-query-param';

import { TextFieldInput } from '~/core/ui/TextField';
import getSupabaseServerClient from '~/core/supabase/server-client';

import configuration from '~/configuration';

interface OrganizationsAdminPageProps {
  searchParams: {
    page?: string;
    search?: string;
  };
}

export const metadata = {
  title: `Organizations | ${configuration.site.siteName}`,
};

function OrganizationsAdminPage({ searchParams }: OrganizationsAdminPageProps) {
  const page = getPageFromQueryParams(searchParams.page);
  const client = getSupabaseServerClient({ admin: true });
  const perPage = 20;
  const search = searchParams.search || '';

  const { organizations, count } = use(getOrganizations(client, search, page));
  const pageCount = count ? Math.ceil(count / perPage) : 0;

  return (
    <div className={'flex flex-1 flex-col'}>
      <AdminHeader>Manage Organizations</AdminHeader>

      <AppContainer>
        <div className={'flex flex-col space-y-4'}>
          <form action={handleSearchOrganization}>
            <TextFieldInput
              name={'search'}
              defaultValue={search}
              placeholder={'Search Organization...'}
            />
          </form>

          <OrganizationsTable
            perPage={perPage}
            page={page}
            pageCount={pageCount}
            organizations={organizations}
          />
        </div>
      </AppContainer>
    </div>
  );
}

export default AdminGuard(OrganizationsAdminPage);

async function handleSearchOrganization(data: FormData) {
  'use server';

  const search = data.get('search') as string;

  if (!search) {
    return redirect('/admin/organizations');
  }

  redirect(`/admin/organizations?search=${search}`);
}
