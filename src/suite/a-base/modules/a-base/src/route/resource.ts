import { IModuleRoute } from '@cabloy/core';

const routes: IModuleRoute[] = [
  // resource
  { method: 'post', path: 'resource/select', controller: 'resource' },
  { method: 'post', path: 'resource/read', controller: 'resource' },
  { method: 'post', path: 'resource/check', controller: 'resource' },
  {
    method: 'post',
    path: 'resource/resourceRoles',
    controller: 'resource',
    meta: { right: { type: 'atom', action: 'authorize' } },
  },
  {
    method: 'post',
    path: 'resource/resourceRoleRemove',
    controller: 'resource',
    meta: { right: { type: 'atom', action: 'authorize' } },
  },
  {
    method: 'post',
    path: 'resource/resourceRoleAdd',
    controller: 'resource',
    meta: { right: { type: 'atom', action: 'authorize' } },
  },
];

export default routes;
