import { Type } from 'vona';
import { DECORATORS } from '../constants.js';

export const exploreGlobalApiSecurityMetadata = (metatype: Type<unknown>) => {
  const security = Reflect.getMetadata(DECORATORS.API_SECURITY, metatype);
  return security ? { security } : undefined;
};

export const exploreApiSecurityMetadata = (_instance: object, _prototype: Type<unknown>, method: object) => {
  return Reflect.getMetadata(DECORATORS.API_SECURITY, method);
};
