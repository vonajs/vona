import { IModuleRoute } from '@cabloy/core';

export const routes: IModuleRoute[] = [
  // captcha
  { method: 'get', path: 'captcha/image', controller: 'captcha' },
];
