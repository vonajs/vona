import { IModuleRoute } from '@cabloy/core';

const routes: IModuleRoute[] = [
  // comment
  { method: 'post', path: 'comment/all', controller: 'comment' },
  {
    method: 'post',
    path: 'comment/list',
    controller: 'comment',
    meta: { right: { type: 'atom', action: 'read', checkFlow: true } },
  },
  {
    method: 'post',
    path: 'comment/count',
    controller: 'comment',
    meta: { right: { type: 'atom', action: 'read', checkFlow: true } },
  },
  {
    method: 'post',
    path: 'comment/item',
    controller: 'comment',
    meta: { right: { type: 'atom', action: 'read', checkFlow: true } },
  },
  {
    method: 'post',
    path: 'comment/save',
    controller: 'comment',
    middlewares: 'transaction',
    meta: {
      auth: { user: true },
      right: { type: 'atom', action: 'read', checkFlow: true },
    },
  },
  {
    method: 'post',
    path: 'comment/delete',
    controller: 'comment',
    middlewares: 'transaction',
    meta: {
      auth: { user: true },
      right: { type: 'atom', action: 'read', checkFlow: true },
    },
  },
  {
    method: 'post',
    path: 'comment/heart',
    controller: 'comment',
    middlewares: 'transaction',
    meta: {
      auth: { user: true },
      right: { type: 'atom', action: 'read', checkFlow: true },
    },
  },
];

export default routes;
