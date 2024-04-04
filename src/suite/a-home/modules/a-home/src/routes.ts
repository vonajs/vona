import { IModuleRoute } from '@cabloy/core';

export const routes: IModuleRoute[] = [
  // home
  { method: 'get', path: 'echo', controller: 'home' },
];
