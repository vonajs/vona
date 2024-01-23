import { IModuleRoute } from '@cabloy/core';

export const routes: IModuleRoute[] = [
  // captcha
  { method: 'post', path: 'captcha/createProviderInstance', controller: 'captcha' },
  { method: 'post', path: 'captcha/refreshProviderInstance', controller: 'captcha' },
];
