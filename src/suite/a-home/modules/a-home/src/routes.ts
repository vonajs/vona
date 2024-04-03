import { IModuleRoute } from '@cabloy/core';

export const routes: IModuleRoute[] = [
  // hello
  { method: 'get', path: 'hello', controller: 'hello' },
];
