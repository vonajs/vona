import { IModuleRoute } from 'vona';

export const routes: IModuleRoute[] = [
  // auth
  { method: 'post', path: 'auth/list', controller: 'auth' },
];
