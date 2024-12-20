import { schemaArray } from './array.js';
import { schemaDefault } from './default.js';
import { schemaEmail } from './email.js';
import { schemaObject } from './object.js';
import { schemaOptional } from './optional.js';

export const v = {
  array: schemaArray,
  default: schemaDefault,
  email: schemaEmail,
  object: schemaObject,
  optional: schemaOptional,
};
