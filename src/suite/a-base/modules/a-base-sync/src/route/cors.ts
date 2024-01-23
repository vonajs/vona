import { IModuleRoute } from '@cabloy/core';

const routes: IModuleRoute[] = [
  // cors
  { method: 'options', path: /.*/ },
];

export default routes;
