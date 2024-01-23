import { IModuleRoute } from '@cabloy/core';

export const routes: IModuleRoute[] = [
  {
    method: 'post',
    path: 'share/generate',
    controller: 'share',
    meta: {
      auth: { user: true },
    },
  },
  { method: 'get', path: 'go/:uuid', controller: 'share', action: 'shareGo' },
];
