'use client';

import { useState } from 'react';
import classNames from 'clsx';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

import Heading from '~/core/ui/Heading';
import Button from '~/core/ui/Button';
import If from '~/core/ui/If';
import Trans from '~/core/ui/Trans';

import configuration from '~/configuration';

interface CheckoutButtonProps {
  readonly stripePriceId?: string;
  readonly recommended?: boolean;
}

interface PricingItemProps {
  selectable: boolean;
  product: {
    name: string;
    features: string[];
    description: string;
    recommended?: boolean;
    badge?: string;
  };
  plan: {
    name: string;
    stripePriceId?: string;
    price: string;
    label?: string;
    href?: string;
  };
}

const STRIPE_PRODUCTS = configuration.stripe.products;

const STRIPE_PLANS = STRIPE_PRODUCTS.reduce<string[]>((acc, product) => {
  product.plans.forEach((plan) => {
    if (plan.name && !acc.includes(plan.name)) {
      acc.push(plan.name);
    }
  });

  return acc;
}, []);

function PricingTable(
  props: React.PropsWithChildren<{
    CheckoutButton?: React.ComponentType<CheckoutButtonProps>;
  }>,
) {
  const [planVariant, setPlanVariant] = useState<string>(STRIPE_PLANS[0]);

  return (
    <div className={'flex flex-col space-y-12'}>
      <div className={'flex justify-center'}>
        <PlansSwitcher
          plans={STRIPE_PLANS}
          plan={planVariant}
          setPlan={setPlanVariant}
        />
      </div>

      <div
        className={
          'flex flex-col items-start space-y-6 lg:space-y-0' +
          ' justify-center lg:flex-row lg:space-x-4 xl:space-x-6'
        }
      >
        {STRIPE_PRODUCTS.map((product) => {
          const plan =
            product.plans.find((item) => item.name === planVariant) ??
            product.plans[0];

          return (
            <PricingItem
              selectable
              key={plan.stripePriceId ?? plan.name}
              plan={plan}
              product={product}
              CheckoutButton={props.CheckoutButton}
            />
          );
        })}
      </div>
    </div>
  );
}

export default PricingTable;

PricingTable.Item = PricingItem;
PricingTable.Price = Price;
PricingTable.FeaturesList = FeaturesList;

function PricingItem(
  props: React.PropsWithChildren<
    PricingItemProps & {
      CheckoutButton?: React.ComponentType<CheckoutButtonProps>;
    }
  >,
) {
  const recommended = props.product.recommended ?? false;

  return (
    <div
      data-cy={'subscription-plan'}
      className={classNames(
        `
         relative flex w-full flex-col justify-between space-y-4 rounded-2xl
         p-6 lg:w-4/12 xl:p-8 2xl:w-3/12
      `,
        {
          ['bg-primary-600 text-primary-contrast']: recommended,
        },
      )}
    >
      <div className={'flex flex-col space-y-1.5'}>
        <div className={'flex items-center space-x-3'}>
          <Heading type={3}>{props.product.name}</Heading>

          <If condition={props.product.badge}>
            <span
              className={classNames(
                `rounded-md py-1 px-2 text-xs font-medium`,
                {
                  ['bg-primary-700 text-primary-contrast']: recommended,
                  ['bg-gray-50 text-gray-500 dark:bg-dark-700' +
                  ' dark:text-gray-300']: !recommended,
                },
              )}
            >
              {props.product.badge}
            </span>
          </If>
        </div>

        <span
          className={classNames('text-sm font-medium', {
            'text-primary-contrast': recommended,
            'text-gray-400': !recommended,
          })}
        >
          {props.product.description}
        </span>
      </div>

      <div className={'flex items-end space-x-1'}>
        <Price>{props.plan.price}</Price>

        <If condition={props.plan.name}>
          <span
            className={classNames(`text-lg lowercase`, {
              'text-gray-100': recommended,
              'text-gray-400 dark:text-gray-400': !recommended,
            })}
          >
            <span>/</span>
            <span>{props.plan.name}</span>
          </span>
        </If>
      </div>

      <div className={'text-current'}>
        <FeaturesList features={props.product.features} />
      </div>

      <If condition={props.selectable}>
        <If
          condition={props.plan.stripePriceId && props.CheckoutButton}
          fallback={
            <DefaultCheckoutButton
              recommended={recommended}
              plan={props.plan}
            />
          }
        >
          {(CheckoutButton) => (
            <CheckoutButton
              recommended={recommended}
              stripePriceId={props.plan.stripePriceId}
            />
          )}
        </If>
      </If>
    </div>
  );
}

function FeaturesList(
  props: React.PropsWithChildren<{
    features: string[];
  }>,
) {
  return (
    <ul className={'flex flex-col space-y-1.5'}>
      {props.features.map((feature) => {
        return (
          <ListItem key={feature}>
            <Trans
              i18nKey={`common:plans.features.${feature}`}
              defaults={feature}
            />
          </ListItem>
        );
      })}
    </ul>
  );
}

function Price({ children }: React.PropsWithChildren) {
  return (
    <div>
      <span className={'text-2xl font-bold lg:text-3xl xl:text-4xl'}>
        {children}
      </span>
    </div>
  );
}

function ListItem({ children }: React.PropsWithChildren) {
  return (
    <li className={'flex items-center space-x-3 font-medium'}>
      <div>
        <CheckCircleIcon className={'h-6'} />
      </div>

      <span className={'text-sm'}>{children}</span>
    </li>
  );
}

function PlansSwitcher(
  props: React.PropsWithChildren<{
    plans: string[];
    plan: string;
    setPlan: (plan: string) => void;
  }>,
) {
  return (
    <div className={'flex'}>
      {props.plans.map((plan, index) => {
        const selected = plan === props.plan;

        const className = classNames('focus:!ring-0 !outline-none', {
          'rounded-r-none': index === 0,
          'rounded-l-none': index === props.plans.length - 1,
          'border-gray-100 dark:border-dark-800 hover:bg-gray-50 dark:hover:bg-dark-800':
            !selected,
        });

        return (
          <Button
            round
            key={plan}
            color={selected ? 'primary' : 'transparent'}
            className={className}
            onClick={() => props.setPlan(plan)}
          >
            <Trans i18nKey={`common:plans.${plan}`} defaults={plan} />
          </Button>
        );
      })}
    </div>
  );
}

function DefaultCheckoutButton(
  props: React.PropsWithChildren<{
    plan: PricingItemProps['plan'];
    recommended?: boolean;
  }>,
) {
  const linkHref =
    props.plan.href ??
    `${configuration.paths.signUp}?utm_source=${props.plan.stripePriceId}`;
  const label = props.plan.label ?? 'common:getStarted';

  return (
    <div className={'bottom-0 left-0 w-full p-0'}>
      <Button
        className={classNames({
          ['bg-primary-contrast hover:bg-primary-contrast/90' +
          ' font-bold text-gray-900']: props.recommended,
        })}
        block
        href={linkHref}
        color={props.recommended ? 'custom' : 'secondary'}
      >
        <Trans i18nKey={label} defaults={label} />
      </Button>
    </div>
  );
}
