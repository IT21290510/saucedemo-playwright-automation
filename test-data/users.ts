// Store test user credentials in one place.
// This prevents us from repeating credentials in every test file.

export const users = {
  // Valid SauceDemo user
  standardUser: {
    username: 'standard_user',
    password: 'secret_sauce',
  },

  // Locked-out SauceDemo user
  lockedOutUser: {
    username: 'locked_out_user',
    password: 'secret_sauce',
  },

  // Invalid login credentials
  invalidUser: {
    username: 'standard_user',
    password: 'wrong_password',
  },
};