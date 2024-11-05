import { Type } from '@nestjs/common';
import { DECORATORS } from '../constants.js';

export const exploreApiExcludeEndpointMetadata = (_instance: object, _prototype: Type<unknown>, method: object) =>
  Reflect.getMetadata(DECORATORS.API_EXCLUDE_ENDPOINT, method);
