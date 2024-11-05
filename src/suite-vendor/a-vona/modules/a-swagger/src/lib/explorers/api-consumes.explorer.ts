import { Type } from '@nestjs/common';
import { DECORATORS } from '../constants.js';

export const exploreGlobalApiConsumesMetadata = (metatype: Type<unknown>) => {
  const consumes = Reflect.getMetadata(DECORATORS.API_CONSUMES, metatype);
  return consumes ? { consumes } : undefined;
};

export const exploreApiConsumesMetadata = (
  _instance: object,
  _prototype: Type<unknown>,
  method: object,
): string[] | undefined => Reflect.getMetadata(DECORATORS.API_CONSUMES, method);
