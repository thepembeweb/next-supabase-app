import * as StripeLib from 'stripe';
import type StripeWebhooks from '~/core/stripe/stripe-webhooks.enum';

const STRIPE_API_VERSION = '2023-08-16';

const stripe = new StripeLib.Stripe(`sk_test_12345`, {
  host: `localhost`,
  port: 12111,
  apiVersion: STRIPE_API_VERSION,
  protocol: `http`,
});

const $get = cy.cyGet.bind(cy);

const stripePo = {
  $subscriptionName: () => $get('subscription-name'),
  $awaitingPaymentAlert: () => $get('awaiting-payment-alert'),
  createWebhookPayload,
  sendWebhook(params: { type: StripeWebhooks; body: UnknownObject }) {
    const body = this.createWebhookPayload(params.body, params.type);
    const signature = stripePo.createSignature(body);

    cy.request({
      url: 'http://localhost:3000/api/stripe/webhook',
      method: `POST`,
      headers: {
        'stripe-signature': signature,
      },
      body,
    });
  },
  createSignature(payload: unknown) {
    return stripe.webhooks.generateTestHeaderString({
      payload: JSON.stringify(payload),
      secret: Cypress.env('STRIPE_WEBHOOK_SECRET'),
    });
  },
};

function createWebhookPayload(data: unknown, type: StripeWebhooks) {
  return {
    id: 'evt_1LK3nDI1i3VnbZTqgFqyzkWx',
    object: 'event',
    api_version: '2020-08-27',
    created: 1657473579,
    data: {
      object: data,
    },
    livemode: false,
    pending_webhooks: 0,
    request: {
      id: null,
      idempotency_key: null,
    },
    type,
  };
}

export default stripePo;
