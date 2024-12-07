// broadcasts
const broadcasts = {
  smsProviderChanged: {
    bean: 'smsProviderChanged',
  },
};

// captcha scenes
// const _captchaSimple = {
//   module: 'a-captchasimple',
//   name: 'captcha',
// };
const _captchaSMS = {
  module: 'a-authsms',
  name: 'captcha',
};

import { VonaApplication } from 'vona';

export const config = (_app: VonaApplication) => {
  return {
    broadcasts,
    // account
    account: {
      url: {
        mobileVerify: '/a/authsms/mobileVerify',
      },
    },
    // captcha
    captcha: {
      scenes: {
        mobileVerify: _captchaSMS,
        signup: _captchaSMS,
        signin: _captchaSMS,
        signupCode: null, // _captchaSimple,
      },
    },
    // sms provider
    sms: {
      providers: {
        aliyun: {
          title: 'AliYun',
          current: false,
          accessKeyId: '',
          accessKeySecret: '',
          endpoint: 'https://dysmsapi.aliyuncs.com',
          apiVersion: '2017-05-25',
          signName: '',
          templates: {
            mobileVerify: '',
            signup: '',
            signin: '',
          },
        },
        test: {
          title: 'Test',
          current: true,
        },
      },
    },
  };
};
