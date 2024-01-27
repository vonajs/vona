import { IModuleRoute } from '@cabloy/core';

const routes: IModuleRoute[] = [
  // util
  {
    method: 'get',
    path: 'util/performAction',
    controller: 'util',
    middlewares: 'jsonp',
    meta: { auth: { enable: false } },
  },
  { method: 'post', path: 'util/performActions', controller: 'util' },
];

export default routes;
