import { IModuleRoute } from 'vona';

export const routes: IModuleRoute[] = [
  // io
  {
    method: 'post',
    path: 'subscribe',
    controller: 'io',
    meta: {
      auth: { user: true },
      authOpen: { enableAuthOpen: true },
    },
  },
  {
    method: 'post',
    path: 'unsubscribe',
    controller: 'io',
    meta: {
      auth: { user: true },
      authOpen: { enableAuthOpen: true },
    },
  },
  // messageClass
  { method: 'post', path: 'messageClass/messageClass', controller: 'messageClass', meta: { auth: { user: true } } },
  // message
  { method: 'post', path: 'message/offset', controller: 'message', meta: { auth: { user: true } } },
  { method: 'post', path: 'message/select', controller: 'message', meta: { auth: { user: true } } },
  { method: 'post', path: 'message/count', controller: 'message', meta: { auth: { user: true } } },
  { method: 'post', path: 'message/setRead', controller: 'message', meta: { auth: { user: true } } },
  { method: 'post', path: 'message/delete', controller: 'message', meta: { auth: { user: true } } },
  //
  { method: 'get', path: 'test/echo', controller: 'test', meta: { auth: { user: true } } },
  { method: 'post', path: 'test/echo', controller: 'test', meta: { auth: { user: true } } },
];
