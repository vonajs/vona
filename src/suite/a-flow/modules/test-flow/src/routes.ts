import { IModuleRoute } from 'vona';

export const routes: IModuleRoute[] = [
  // flow/start: not use transaction so as to save the current flow status
  // { method: 'post', path: 'flow/start', controller: 'flow', middlewares: 'test,transaction' },
  { method: 'post', path: 'flow/start', controller: 'flow', middlewares: 'test' },
];
