'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Session } from '@supabase/supabase-js';

import useCollapsible from '~/core/hooks/use-sidebar-state';
import AppSidebar from '~/app/dashboard/[organization]/components/AppSidebar';
import Toaster from '~/components/Toaster';
import SentryBrowserWrapper from '~/components/SentryProvider';

import MembershipRole from '~/lib/organizations/types/membership-role';
import UserData from '~/core/session/types/user-data';
import Organization from '~/lib/organizations/types/organization';
import UserSession from '~/core/session/types/user-session';

import OrganizationContext from '~/lib/contexts/organization';
import CsrfTokenContext from '~/lib/contexts/csrf';
import SidebarContext from '~/lib/contexts/sidebar';
import UserSessionContext from '~/core/session/contexts/user-session';
import I18nProvider from '~/i18n/I18nProvider';

import { setCookie } from '~/core/generic/cookies';
import AuthChangeListener from '~/components/AuthChangeListener';

interface Data {
  accessToken: Maybe<string>;
  language: string;
  csrfToken: string | null;
  session: Session;
  user: UserData | null;
  organization: Maybe<Organization>;
  role: Maybe<MembershipRole>;
  ui: {
    sidebarState?: string;
    theme?: string;
  };
}

const RouteShell: React.FCC<{
  data: Data;
}> = ({ data, children }) => {
  const userSessionContext: UserSession = useMemo(() => {
    return {
      auth: data.session,
      data: data.user ?? undefined,
      role: data.role,
    };
  }, [data]);

  const [organization, setOrganization] = useState<Maybe<Organization>>(
    data.organization,
  );

  const [userSession, setUserSession] =
    useState<Maybe<UserSession>>(userSessionContext);

  const updateCurrentOrganization = useCallback(() => {
    setOrganization(data.organization);

    const organizationId = data.organization?.uuid;
    const cookieName = `${userSession?.data?.id}-organizationId`;

    if (organizationId) {
      setCookie(cookieName, organizationId.toString());
    }
  }, [data.organization, userSession]);

  const updateCurrentUser = useCallback(() => {
    if (userSessionContext.auth) {
      setUserSession(userSessionContext);
    }
  }, [userSessionContext]);

  useEffect(updateCurrentOrganization, [updateCurrentOrganization]);
  useEffect(updateCurrentUser, [updateCurrentUser]);

  return (
    <SentryBrowserWrapper>
      <UserSessionContext.Provider value={{ userSession, setUserSession }}>
        <OrganizationContext.Provider value={{ organization, setOrganization }}>
          <CsrfTokenContext.Provider value={data.csrfToken}>
            <I18nProvider lang={data.language}>
              <AuthChangeListener
                accessToken={data.accessToken}
                whenSignedOut={'/'}
              >
                <main>
                  <Toaster />

                  <RouteShellWithSidebar
                    organization={organization?.uuid ?? ''}
                    collapsed={data.ui.sidebarState === 'collapsed'}
                  >
                    {children}
                  </RouteShellWithSidebar>
                </main>
              </AuthChangeListener>
            </I18nProvider>
          </CsrfTokenContext.Provider>
        </OrganizationContext.Provider>
      </UserSessionContext.Provider>
    </SentryBrowserWrapper>
  );
};

export default RouteShell;

function RouteShellWithSidebar(
  props: React.PropsWithChildren<{
    collapsed: boolean;
    organization: string;
  }>,
) {
  const [collapsed, setCollapsed] = useCollapsible(props.collapsed);

  return (
    <div className={'flex h-full flex-1 overflow-hidden'}>
      <SidebarContext.Provider value={{ collapsed, setCollapsed }}>
        <div className={'hidden lg:block'}>
          <AppSidebar organizationUid={props.organization} />
        </div>

        <div
          className={
            'relative mx-auto h-screen w-full overflow-y-auto' +
            ' flex flex-col'
          }
        >
          {props.children}
        </div>
      </SidebarContext.Provider>
    </div>
  );
}
