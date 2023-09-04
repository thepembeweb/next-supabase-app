import stripePo from '../../support/stripe.po';
import StripeWebhooks from '~/core/stripe/stripe-webhooks.enum';
import organizationPageObject from '../../support/organization.po';

describe(`Create Subscription`, () => {
  before(() => {
    // switch to the organization that is mapped to the Stripe mocks
    const organization = organizationPageObject.useDefaultOrganization();

    cy.signIn(`/dashboard/${organization}/settings/subscription`);
  });

  describe('Using Webhooks', () => {
    describe(`When the user creates a subscription with status = PAID`, () => {
      before(() => {
        cy.fixture('session').then((session) => {
          stripePo.sendWebhook({
            body: session,
            type: StripeWebhooks.Completed,
          });
        });
      });

      it(`should display a Subscription Card`, () => {
        cy.reload();

        stripePo.$subscriptionName().should('have.text', 'Testing Plan');
      });
    });

    describe(`When the user unsubscribes`, () => {
      before(() => {
        cy.fixture('subscription').then((subscription) => {
          stripePo.sendWebhook({
            body: subscription,
            type: StripeWebhooks.SubscriptionDeleted,
          });
        });
      });

      it('should delete the subscription', () => {
        cy.reload();
        stripePo.$subscriptionName().should('not.exist');
      });
    });

    describe(`When the user creates a subscription with status = AWAITING_PAYMENT`, () => {
      before(() => {
        cy.fixture('session').then((session) => {
          stripePo.sendWebhook({
            body: {
              ...session,
              payment_status: 'incomplete',
            },
            type: StripeWebhooks.Completed,
          });
        });
      });

      it(`should display a warning alert`, () => {
        cy.reload();
        stripePo.$awaitingPaymentAlert().should('be.visible');

        // restore DB by deleting the subscription
        cy.fixture('subscription').then((subscription) => {
          stripePo.sendWebhook({
            body: subscription,
            type: StripeWebhooks.SubscriptionDeleted,
          });
        });
      });
    });
  });
});
