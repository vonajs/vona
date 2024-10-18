import { IModuleRoute } from 'vona';

const routes: IModuleRoute[] = [
  // cors
  { method: 'options', path: /.*/ },
];

export default routes;
