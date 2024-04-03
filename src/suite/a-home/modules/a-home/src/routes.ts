import { IModuleRoute } from '@cabloy/core';

export const routes: IModuleRoute[] = [
  // hello
  { method: 'post', path: 'hello/action', controller: 'hello' },
];
