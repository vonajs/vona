import { IModuleRoute } from 'vona';

const routes: IModuleRoute[] = [
  // layoutConfig
  { method: 'post', path: 'layoutConfig/load', controller: 'layoutConfig' },
  { method: 'post', path: 'layoutConfig/save', controller: 'layoutConfig' },
  { method: 'post', path: 'layoutConfig/saveKey', controller: 'layoutConfig' },
];

export default routes;
