import { cookies } from 'next/headers';
import type { NextRequest } from 'next/server';
import { redirect } from 'next/navigation';

import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';

import { acceptInviteToOrganization } from '~/lib/memberships/mutations';
import getSupabaseServerActionClient from '~/core/supabase/action-client';

import { Database } from '~/database.types';
import getLogger from '~/core/logger';
import configuration from '~/configuration';

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const logger = getLogger();

  const authCode = requestUrl.searchParams.get('code');
  const inviteCode = requestUrl.searchParams.get('inviteCode');

  const onError = (error?: string) => {
    logger.error(`An error occurred while signing user in`, error);

    redirect(`/auth/callback/error?error=${error}`);
  };

  if (authCode) {
    const client = createRouteHandlerClient<Database>({ cookies });

    try {
      const { error, data } =
        await client.auth.exchangeCodeForSession(authCode);

      // if we have an error, we redirect to the error page
      if (error) {
        return onError(error.message);
      }

      // if we have an invite code, we accept the invite
      if (inviteCode) {
        const userId = data.user.id;

        await acceptInviteFromEmailLink({ inviteCode, userId });
      }
    } catch (e) {
      logger.error(`An error occurred while exchanging code for session`, e);

      onError(`An error occurred while signing user in`);
    }
  }

  return redirect(configuration.paths.appHome);
}

/**
 * @name acceptInviteFromEmailLink
 * @description If we find an invite code, we try to accept the invite
 * received from the email link method
 * @param params
 */
async function acceptInviteFromEmailLink(params: {
  inviteCode: string;
  userId: Maybe<string>;
}) {
  const logger = getLogger();

  if (!params.userId) {
    logger.error(params, `Attempted to accept invite, but no user id provided`);

    return;
  }

  logger.info(params, `Found invite code. Accepting invite...`);

  const adminClient = getSupabaseServerActionClient({ admin: true });

  await acceptInviteToOrganization(adminClient, {
    code: params.inviteCode,
    userId: params.userId,
  });

  logger.info(params, `Invite successfully accepted`);
}
