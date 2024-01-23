import { IModuleRoute } from '@cabloy/core';

export const routes: IModuleRoute[] = [
  { method: 'post', path: 'validation/schema', controller: 'validation' },
  { method: 'post', path: 'validation/validate', controller: 'validation' },
];
