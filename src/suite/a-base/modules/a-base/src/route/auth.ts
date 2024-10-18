import { IModuleRoute } from 'vona';

const routes: IModuleRoute[] = [
  // auth
  { method: 'post', path: 'auth/echo', controller: 'auth', meta: { auth: { enable: false } } },
  { method: 'post', path: 'auth/check', controller: 'auth', meta: { auth: { user: true } } },
  {
    method: 'post',
    path: 'auth/logout',
    controller: 'auth',
    meta: {
      auth: { enable: true },
      authOpen: { enableAuthOpen: true },
    },
  },
];

export default routes;
