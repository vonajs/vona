// startups
const startups = {
  cacheSmsProviders: {
    bean: 'cacheSmsProviders',
    instance: true,
  },
};

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

import { CabloyApplication } from '@cabloy/core';

export const config = (_app: CabloyApplication) => {
  return {
    startups,
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
