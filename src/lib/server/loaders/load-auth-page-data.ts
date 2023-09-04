import 'server-only';

import { redirect } from 'next/navigation';
import configuration from '~/configuration';

import getSupabaseServerClient from '~/core/supabase/server-client';
import initializeServerI18n from '~/i18n/i18n.server';
import getLanguageCookie from '~/i18n/get-language-cookie';
import verifyRequiresMfa from '~/core/session/utils/check-requires-mfa';

/**
 * @name loadAuthPageData
 * @description This function is responsible for loading the authentication
 * layout's data.
 * If the user is logged in and does not require multi-factor
 * authentication, redirect them to the app home page. Otherwise, continue
 * to the authentication pages.
 */
const loadAuthPageData = async () => {
  const { language } = await initializeServerI18n(getLanguageCookie());
  const client = getSupabaseServerClient();

  const {
    data: { session },
  } = await client.auth.getSession();

  const requiresMultiFactorAuthentication = await verifyRequiresMfa(client);

  // If the user is logged in and does not require multi-factor authentication,
  // redirect them to the home page.
  if (session && !requiresMultiFactorAuthentication) {
    console.log(
      `User is logged in and does not require multi-factor authentication. Redirecting to home page.`,
    );

    redirect(configuration.paths.appHome);
  }

  return {
    language,
  };
};

export default loadAuthPageData;
