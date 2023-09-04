'use client';

import { useState } from 'react';
import SidebarContext from '~/lib/contexts/sidebar';
import I18nProvider from '~/i18n/I18nProvider';
import CsrfTokenContext from '~/lib/contexts/csrf';

function AdminProviders(
  props: React.PropsWithChildren<{
    collapsed: boolean;
    csrfToken: string | null;
    language: string | undefined;
  }>,
) {
  const [collapsed, setCollapsed] = useState(props.collapsed);

  return (
    <SidebarContext.Provider value={{ collapsed, setCollapsed }}>
      <I18nProvider lang={props.language}>
        <CsrfTokenContext.Provider value={props.csrfToken}>
          {props.children}
        </CsrfTokenContext.Provider>
      </I18nProvider>
    </SidebarContext.Provider>
  );
}

export default AdminProviders;
