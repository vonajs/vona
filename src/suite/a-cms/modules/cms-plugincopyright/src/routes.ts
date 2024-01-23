import { IModuleRoute } from '@cabloy/core';

export const routes: IModuleRoute[] = [
  // util
  { method: 'get', path: 'util/md/:atomId', controller: 'util', action: 'md' },
];
