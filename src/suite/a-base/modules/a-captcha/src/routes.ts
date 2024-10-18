import { IModuleRoute } from 'vona';

export const routes: IModuleRoute[] = [
  // captcha
  { method: 'post', path: 'captcha/createProviderInstance', controller: 'captcha' },
  { method: 'post', path: 'captcha/refreshProviderInstance', controller: 'captcha' },
];
