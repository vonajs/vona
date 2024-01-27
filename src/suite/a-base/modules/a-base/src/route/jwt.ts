import { IModuleRoute } from '@cabloy/core';

const routes: IModuleRoute[] = [
  // jwt
  { method: 'post', path: 'jwt/create', controller: 'jwt' },
];

export default routes;
