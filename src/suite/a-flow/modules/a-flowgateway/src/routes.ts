import { IModuleRoute } from '@cabloy/core';

export const routes: IModuleRoute[] = [
  //
  { method: 'post', path: 'flow/start', controller: 'flow', middlewares: 'test' },
];
