// confirmationEmail
//   subject
const ConfirmationEmailSubject = '[{{siteName}}] Account Confirmation';
//   body
const ConfirmationEmailBody = `
Hi {{userName}},

Welcome to join us. Please click this link to confirm your email:

{{link}}

Regards,
{{siteName}} Team
`;

// passwordResetEmail
//   subject
const PasswordResetEmailSubject = '[{{siteName}}] Password Reset';
//   body
const PasswordResetEmailBody = `
Hi {{userName}},

To reset your password, visit the following address:

{{link}}

Regards,
{{siteName}} Team
`;

//

export default {
  ConfirmationEmailExpired: 'This email confirmation link has expired',
  ConfirmationEmailSucceeded: 'Your email address has been confirmed',
  ConfirmationEmailSubject,
  ConfirmationEmailBody,
  PasswordResetEmailExpired: 'This password reset link has expired',
  PasswordResetEmailSubject,
  PasswordResetEmailBody,
  AuthenticationFailed: 'Authentication Failed',
  UserIsDisabled: 'User is Disabled',
};
