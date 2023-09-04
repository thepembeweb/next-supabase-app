import Trans from '~/core/ui/Trans';

import SettingsTile from '~/app/dashboard/[organization]/settings/components/SettingsTile';
import Plans from '~/app/dashboard/[organization]/settings/subscription/components/Plans';
import PlansStatusAlertContainer from '~/app/dashboard/[organization]/settings/subscription/components/PlanStatusAlertContainer';
import { withI18n } from '~/i18n/with-i18n';

export const metadata = {
  title: 'Subscription',
};

const SubscriptionSettingsPage = () => {
  return (
    <SettingsTile
      heading={<Trans i18nKey={'common:subscriptionSettingsTabLabel'} />}
      subHeading={<Trans i18nKey={'subscription:subscriptionTabSubheading'} />}
    >
      <div className={'flex flex-col space-y-4'}>
        <PlansStatusAlertContainer />

        <Plans />
      </div>
    </SettingsTile>
  );
};

export default withI18n(SubscriptionSettingsPage);
