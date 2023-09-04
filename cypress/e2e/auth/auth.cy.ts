import auth from '../../support/auth.po';
import configuration from '~/configuration';
import authPo from '../../support/auth.po';

const randomNumber = () => Math.round(Math.random() * 100);

describe(`Authentication`, () => {
  // randomize email to avoid using duplicate emails
  const email = `test+${randomNumber()}@makerkit.dev`;
  const password = `makerkitpwd`;

  describe(`Sign Up`, () => {
    beforeEach(() => {
      cy.visit(`/auth/sign-up`);
    });

    describe(`given the user signs up with email/password`, () => {
      describe(`when the passwords mismatch`, () => {
        it('should return an error', () => {
          auth.signUpWithEmailAndPassword(email, password, 'anotherpassword');

          cy.url().should('contain', configuration.paths.signUp);
        });
      });

      describe(`when the request is successful`, () => {
        it('should display the email confirmation alert', () => {
          auth.signUpWithEmailAndPassword(email, password);

          cy.cyGet('email-confirmation-alert').should('exist');

          cy.wait(100);
          cy.task('confirmEmail', email);
        });
      });

      describe(`when the request is unsuccessful because the user already signed up`, () => {
        it('should display an error message', () => {
          auth.signUpWithEmailAndPassword(
            authPo.getDefaultUserEmail(),
            authPo.getDefaultUserPassword()
          );

          auth.$getErrorMessage().should('exist');
        });
      });
    });
  });

  describe(`Sign In`, () => {
    beforeEach(() => {
      cy.visit(`/auth/sign-in`);
    });

    describe(`given the user signs in with email/password`, () => {
      describe(`when the request is not successful`, () => {
        it('should display an error message', () => {
          const email = `awrongemail@makerkit.dev`;
          const password = `somePassword`;

          auth.signInWithEmailAndPassword(email, password);
          auth.$getErrorMessage().should('exist');
        });
      });

      describe(`when the request is successful`, () => {
        it('should take the user to the app home page', () => {
          auth.signInWithEmailAndPassword(
            auth.getDefaultUserEmail(),
            auth.getDefaultUserPassword()
          );

          cy.url().should('contain', configuration.paths.appHome);
        });
      });

      describe(`When the user logs in with a "redirectUrl" query parameter`, () => {
        const returnUrl = `/settings/organization/members`;

        it('should redirect to the route provided', () => {
          cy.visit(`/auth/sign-in?returnUrl=${returnUrl}`);

          auth.signInWithEmailAndPassword(email, password);
          cy.url().should('contain', returnUrl);
        });
      });
    });
  });
});
