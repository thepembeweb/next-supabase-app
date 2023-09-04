const STRIPE_API_VERSION = '2023-08-16';

/**
 * @description returns a Stripe instance
 * If running in Cypress: it will use the Stripe emulated instance pointing
 * to the docker container
 */
export default async function getStripeInstance() {
  if (isCypressEnv()) {
    console.warn(`Stripe is running in Testing mode`);

    return getStripeEmulatorInstance();
  }

  return getStripeProductionInstance();
}

async function getStripeProductionInstance() {
  const Stripe = await loadStripe();
  const key = getStripeKey();

  return new Stripe(key, {
    apiVersion: STRIPE_API_VERSION,
  });
}

function isCypressEnv() {
  return process.env.IS_CI === `true`;
}

async function getStripeEmulatorInstance() {
  const Stripe = await loadStripe();

  return new Stripe(`sk_test_12345`, {
    host: `localhost`,
    port: 12111,
    apiVersion: STRIPE_API_VERSION,
    protocol: `http`,
  });
}

function getStripeKey() {
  const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;

  if (!STRIPE_SECRET_KEY) {
    throw new Error(
      `'STRIPE_SECRET_KEY' environment variable was not provided`,
    );
  }

  return STRIPE_SECRET_KEY;
}

async function loadStripe() {
  const { default: Stripe } = await import('stripe');

  return Stripe;
}
