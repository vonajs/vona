import { Type } from 'vona';
import { DECORATORS } from '../constants.js';

export const exploreGlobalApiExtraModelsMetadata = (metatype: Type<unknown>): Function[] => {
  const extraModels = Reflect.getMetadata(DECORATORS.API_EXTRA_MODELS, metatype);
  return extraModels || [];
};

export const exploreApiExtraModelsMetadata = (
  _instance: object,
  _prototype: Type<unknown>,
  method: object,
): Function[] => Reflect.getMetadata(DECORATORS.API_EXTRA_MODELS, method) || [];
