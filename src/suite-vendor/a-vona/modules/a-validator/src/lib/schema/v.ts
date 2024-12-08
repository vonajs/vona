import { schemaArray } from './array.js';
import { schemaObject } from './object.js';
import { schemaOptional } from './optional.js';

export const v = {
  array: schemaArray,
  object: schemaObject,
  optional: schemaOptional,
};
