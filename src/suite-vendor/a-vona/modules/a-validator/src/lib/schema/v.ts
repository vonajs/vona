import { schemaArray } from './array.js';
import { schemaDefault } from './default.js';
import { schemaObject } from './object.js';
import { schemaOptional } from './optional.js';
import { schemaEmail, schemaIp, schemaMax, schemaMin, schemaUrl, schemaUuid } from './utils.js';

export const v = {
  array: schemaArray,
  default: schemaDefault,
  object: schemaObject,
  optional: schemaOptional,
  email: schemaEmail,
  url: schemaUrl,
  uuid: schemaUuid,
  ip: schemaIp,
  min: schemaMin,
  max: schemaMax,
};
