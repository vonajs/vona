import { IModuleRoute } from '@cabloy/core';

export const routes: IModuleRoute[] = [
  // progress
  {
    method: 'post',
    path: 'progress/check',
    controller: 'progress',
    meta: {
      auth: { user: true },
      authOpen: { enableAuthOpen: true },
    },
  },
  {
    method: 'post',
    path: 'progress/abort',
    controller: 'progress',
    meta: {
      auth: { user: true },
      authOpen: { enableAuthOpen: true },
    },
  },
  {
    method: 'post',
    path: 'progress/delete',
    controller: 'progress',
    meta: {
      auth: { user: true },
      authOpen: { enableAuthOpen: true },
    },
  },
];
