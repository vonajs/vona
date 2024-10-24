import { VonaApplication } from 'vona';

export const config = (_app: VonaApplication) => {
  return {
    defaultPassword: '123456',
    confirmation: {
      timeout: 2 * 24 * 60 * 60 * 1000, // 2 days
    },
    passwordReset: {
      timeout: 30 * 60 * 1000, // 30 minutes
    },
    account: {
      url: {
        emailConfirm: '/a/authsimple/emailConfirm',
        passwordChange: '/a/authsimple/passwordChange',
        passwordForgot: '/a/authsimple/passwordForgot',
        passwordReset: '/a/authsimple/passwordReset',
      },
    },
    captcha: {
      scenes: {
        passwordChange: null,
        signup: null,
        signin: null, // means using default
        // signin: {
        //   module: 'a-captchasimple',
        //   name: 'captcha',
        // },
      },
    },
    email: {
      templates: {
        confirmation: {
          subject: 'ConfirmationEmailSubject',
          body: 'ConfirmationEmailBody',
        },
        passwordReset: {
          subject: 'PasswordResetEmailSubject',
          body: 'PasswordResetEmailBody',
        },
      },
    },
  };
};
