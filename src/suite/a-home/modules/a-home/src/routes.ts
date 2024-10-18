import { IModuleRoute } from 'vona';

export const routes: IModuleRoute[] = [
  // home
  { method: 'get', path: 'echo', controller: 'home' },
];
