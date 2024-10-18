import { IModuleRoute } from 'vona';

const routes: IModuleRoute[] = [
  // tag
  { method: 'post', path: 'tag/list', controller: 'tag' },
  {
    method: 'post',
    path: 'tag/add',
    controller: 'tag',
    meta: { right: { type: 'resource', module: 'a-settings', name: 'settings' } },
  },
  {
    method: 'post',
    path: 'tag/save',
    controller: 'tag',
    meta: { right: { type: 'resource', module: 'a-settings', name: 'settings' } },
  },
  {
    method: 'post',
    path: 'tag/delete',
    controller: 'tag',
    meta: { right: { type: 'resource', module: 'a-settings', name: 'settings' } },
  },
];

export default routes;
