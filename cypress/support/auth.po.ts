// we use a namespace not to pollute the IDE with methods from the tests
const authPageObject = {
  getDefaultUserEmail: () => Cypress.env(`USER_EMAIL`) as string,
  getDefaultUserPassword: () => Cypress.env(`USER_PASSWORD`) as string,
  getDefaultUserCredentials: () => {
    return {
      email: authPageObject.getDefaultUserEmail(),
      password: authPageObject.getDefaultUserPassword(),
    };
  },
  $getEmailInput: () => cy.cyGet(`email-input`),
  $getPasswordInput: () => cy.cyGet(`password-input`),
  $getRepeatPasswordInput: () => cy.cyGet(`repeat-password-input`),
  $getSubmitButton: () => cy.cyGet(`auth-submit-button`),
  $getErrorMessage: () => cy.cyGet(`auth-error-message`),
  $getAcceptInviteSubmitButton: () => cy.cyGet(`accept-invite-submit-button`),
  signInWithEmailAndPassword(email: string, password: string) {
    cy.wait(100);

    this.$getEmailInput().clear().type(email);
    this.$getPasswordInput().clear().type(password);
    this.$getSubmitButton().click();
  },
  signUpWithEmailAndPassword(
    email: string,
    password: string,
    repeatPassword?: string
  ) {
    cy.wait(100);

    this.$getEmailInput().clear().type(email);
    this.$getPasswordInput().clear().type(password);
    this.$getRepeatPasswordInput().type(repeatPassword || password);
    this.$getSubmitButton().click();
  },
  signInProgrammatically({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    const apiUrl = Cypress.env('SUPABASE_URL');
    const apiKey = Cypress.env('SUPABASE_ANON_KEY');
    const url = `${apiUrl}/auth/v1/token?grant_type=password`;

    const host = new URL(apiUrl).hostname.split('.')[0];
    const cookieName = `sb-${host}-auth-token`;

    cy.request({
      url,
      method: 'POST',
      headers: {
        apikey: apiKey,
        Authorization: `Bearer ${apiKey}`,
        ['Content-Type']: 'application/json',
        Accept: 'application/json',
      },
      body: {
        email,
        password,
        data: {},
        gotrue_meta_security: {},
      },
    }).as('auth');

    cy.get('@auth')
      .its('body')
      .then((body) => {
        cy.setCookie(
          cookieName,
          JSON.stringify([
            body.access_token,
            body.refresh_token,
            body.provider_token,
            body.provider_refresh_token,
          ])
        );
      });
  },
};

export default authPageObject;
