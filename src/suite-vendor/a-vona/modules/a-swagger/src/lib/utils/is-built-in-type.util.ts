import { Type } from '@nestjs/common';
import { isFunction } from 'lodash';
import { BUILT_IN_TYPES } from '../services/constants.js';
import { Constructable } from 'vona';

export function isBuiltInType(type: Type<unknown> | Constructable | string): boolean {
  return isFunction(type) && BUILT_IN_TYPES.some(item => item === type);
}
