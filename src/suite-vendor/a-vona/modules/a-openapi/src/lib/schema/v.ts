import { schemaEmail, schemaIp, schemaMax, schemaMin, schemaUrl, schemaUuid } from './helpers.js';
import { schemaDescription, schemaExample, schemaOpenapi } from './openapi.js';
import { schemaArray, schemaDefault, schemaObject, schemaOptional } from './system.js';

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
  example: schemaExample,
};
