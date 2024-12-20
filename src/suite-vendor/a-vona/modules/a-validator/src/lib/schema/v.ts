import { schemaArray } from './array.js';
import { schemaDefault } from './default.js';
import { schemaObject } from './object.js';
import { schemaDescription, schemaOpenapi } from './openapi.js';
import { schemaOptional } from './optional.js';
import { schemaEmail, schemaIp, schemaMax, schemaMin, schemaUrl, schemaUuid } from './helpers.js';

export const v = {
  array: schemaArray,
  default: schemaDefault,
  object: schemaObject,
  optional: schemaOptional,
  // helpers
  email: schemaEmail,
  url: schemaUrl,
  uuid: schemaUuid,
  ip: schemaIp,
  min: schemaMin,
  max: schemaMax,
  // openapi
  openapi: schemaOpenapi,
  description: schemaDescription,
};
