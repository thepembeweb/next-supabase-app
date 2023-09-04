export const profilePo = {
  $getDisplayNameInput: () => cy.cyGet(`profile-display-name`),
  $getUpdateEmailForm: () => cy.cyGet(`update-email-form`),
  $getUpdateProfileForm: () => cy.cyGet(`update-profile-form`),
  $getUpdatePasswordForm: () => cy.cyGet('update-password-form'),
  $getNewEmailInput: () => cy.cyGet(`profile-new-email-input`),
  $getRepeatEmailInput: () => cy.cyGet(`profile-repeat-email-input`),
  $getUpdateEmailPasswordInput: () => cy.cyGet(`profile-password-input`),
  $getUpdateEmailErrorAlert: () => cy.cyGet(`update-email-error-alert`),
  $getUpdatePasswordErrorAlert: () => cy.cyGet(`update-password-error-alert`),
  $getCurrentPasswordInput: () => cy.cyGet(`current-password`),
  $getNewPasswordInput: () => cy.cyGet(`new-password`),
  $getRepeatNewPasswordInput: () => cy.cyGet(`repeat-new-password`),
  $getLinkProviderButton(providerId: string) {
    return cy.get(
      `[data-cy="auth-provider-button"][data-provider="${providerId}"]`
    );
  },
  $getUnlinkProviderButton(providerId: string) {
    return cy.get(
      `[data-cy="unlink-provider-button"][data-provider="${providerId}"]`
    );
  },
  $confirmUnlinkButton() {
    return cy.cyGet(`confirm-unlink-provider-button`);
  },
};

export default profilePo;
