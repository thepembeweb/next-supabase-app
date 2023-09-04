// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import authPo from './auth.po';

export function registerCypressCommands() {
  Cypress.Commands.add('cyGet', (name: string) => {
    return cy.get(createCySelector(name));
  });

  Cypress.Commands.add(
    'signIn',
    (redirectPath = '/', credentials = authPo.getDefaultUserCredentials()) => {
      cy.session(
        [redirectPath, credentials.email, credentials.password, Math.random()],
        () => {
          cy.log(
            `Signing in programmatically and redirecting to ${redirectPath} ...`,
          );

          cy.wrap(authPo.signInProgrammatically(credentials));
        },
      );

      // visit page
      cy.visit(redirectPath);

      // let the page hydrate before continuing
      cy.wait(1000);
    },
  );

  Cypress.Commands.add(`clearStorage`, () => {
    cy.clearCookies();
    localStorage.clear();
    sessionStorage.clear();
  });

  Cypress.Commands.add(`resetDatabase`, () => {
    cy.task(`resetDatabase`);
  });

  Cypress.Commands.add(`signOutSession`, () => {
    cy.request(`POST`, `/auth/sign-out`);
  });

  Cypress.on('uncaught:exception', (err, runnable) => {
    if (err.message.includes('NEXT_REDIRECT')) {
      return false;
    }
  });
}

export function createCySelector(name: string) {
  return `[data-cy="${name}"]`;
}
