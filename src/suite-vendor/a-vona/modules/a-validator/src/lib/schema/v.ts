import { schemaArray } from './array.js';
import { schemaDefault } from './default.js';
import { schemaObject } from './object.js';
import { schemaOptional } from './optional.js';
import { schemaEmail, schemaMax, schemaMin } from './utils.js';

export const v = {
  array: schemaArray,
  default: schemaDefault,
  object: schemaObject,
  optional: schemaOptional,
  email: schemaEmail,
  min: schemaMin,
  max: schemaMax,
};
