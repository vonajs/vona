import { IModuleRoute } from 'vona';

const routes: IModuleRoute[] = [
  // user
  { method: 'post', path: 'user/getLabels', controller: 'user' },
  { method: 'post', path: 'user/setLabels', controller: 'user' },
];

export default routes;
