import { IModuleRoute } from 'vona';

export const routes: IModuleRoute[] = [
  // captcha
  { method: 'get', path: 'captcha/image', controller: 'captcha' },
];
