'use client';

import Alert from '~/core/ui/Alert';
import AppContainer from '~/app/dashboard/[organization]/components/AppContainer';

function UsersAdminPageError() {
  return (
    <AppContainer>
      <Alert type={'error'}>
        <Alert.Heading>Could not load users</Alert.Heading>
        <p>
          There was an error loading the users. Please check your console
          errors.
        </p>
      </Alert>
    </AppContainer>
  );
}

export default UsersAdminPageError;
