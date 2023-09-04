'use client';

import { useState } from 'react';

import SiteHeader from '~/app/(site)/components/SiteHeader';
import UserSessionContext from '~/core/session/contexts/user-session';
import UserSession from '~/core/session/types/user-session';
import AuthChangeListener from '~/components/AuthChangeListener';

type Session = {
  role: UserSession['role'];
  auth: UserSession['auth'];
  data: UserSession['data'];
};

function SiteHeaderSessionProvider(
  props: React.PropsWithChildren<{
    data: Maybe<Session>;
    accessToken: Maybe<string>;
  }>,
) {
  const [userSession, setUserSession] = useState(props.data);

  return (
    <UserSessionContext.Provider value={{ userSession, setUserSession }}>
      <AuthChangeListener accessToken={props.accessToken}>
        <SiteHeader />
      </AuthChangeListener>
    </UserSessionContext.Provider>
  );
}

export default SiteHeaderSessionProvider;
