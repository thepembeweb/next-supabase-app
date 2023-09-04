import authPo from '../../support/auth.po';

describe(`Non-Admin user accessing the Super Admin`, () => {
  it('should redirect the user away', () => {
    cy.signIn('/', {
      email: 'test2@makerkit.dev',
      password: authPo.getDefaultUserPassword(),
    });

    cy.visit('/admin', {
      failOnStatusCode: false,
    });

    cy.url().should('equal', 'http://localhost:3000/');
  });
});
