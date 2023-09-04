import Link from 'next/link';

import SubscriptionStatusBadge from './SubscriptionStatusBadge';
import useCurrentOrganization from '~/lib/organizations/hooks/use-current-organization';

function HeaderSubscriptionStatusBadge() {
  const organization = useCurrentOrganization();
  const subscription = organization?.subscription?.data;

  // if the organization has an active subscription
  // we do not show the subscription status badge
  if (subscription?.status === 'active') {
    return null;
  }

  const href = `/dashboard/${organization?.uuid}/settings/subscription`;

  // in all other cases we show the subscription status badge
  // which will show the subscription status and a link to the subscription page
  return (
    <Link href={href}>
      <SubscriptionStatusBadge subscription={subscription} />
    </Link>
  );
}

export default HeaderSubscriptionStatusBadge;
