import { IModuleRoute } from '@cabloy/core';

export const routes: IModuleRoute[] = [
  // auth
  { method: 'post', path: 'auth/list', controller: 'auth' },
];
