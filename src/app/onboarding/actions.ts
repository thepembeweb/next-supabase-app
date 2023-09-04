'use server';

import { z } from 'zod';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import getLogger from '~/core/logger';
import requireSession from '~/lib/user/require-session';
import completeOnboarding from '~/lib/server/onboarding/complete-onboarding';

import getSupabaseServerActionClient from '~/core/supabase/action-client';
import { createOrganizationIdCookie } from '~/lib/server/cookies/organization.cookie';
import { withSession } from '~/core/generic/actions-utils';

import configuration from '~/configuration';

export const handleOnboardingCompleteAction = withSession(
  async (data: z.infer<ReturnType<typeof getBodySchema>>) => {
    const logger = getLogger();

    const client = getSupabaseServerActionClient();
    const session = await requireSession(client);
    const userId = session.user.id;
    const body = await getBodySchema().safeParseAsync(data);

    if (!body.success) {
      throw new Error(`Invalid request body`);
    }

    const organizationName = body.data.organization;

    const payload = {
      userId,
      organizationName,
      client,
    };

    logger.info(
      {
        userId,
      },
      `Completing onboarding for user...`,
    );

    // complete onboarding and get the organization id created
    const { data: organizationUid, error } = await completeOnboarding(payload);

    if (error) {
      logger.error(
        {
          error,
          userId,
        },
        `Error completing onboarding for user`,
      );

      throw new Error();
    }

    logger.info(
      {
        userId,
        organizationUid,
      },
      `Onboarding successfully completed for user`,
    );

    cookies().set(createOrganizationIdCookie({ userId, organizationUid }));

    const redirectPath = [configuration.paths.appPrefix, organizationUid].join(
      '/',
    );

    return redirect(redirectPath);
  },
);

function getBodySchema() {
  return z.object({
    organization: z.string().trim().min(1),
    csrfToken: z.string(),
  });
}
