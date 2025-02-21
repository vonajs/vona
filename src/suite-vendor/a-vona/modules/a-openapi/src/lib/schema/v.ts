import { schemaEmail, schemaIp, schemaMax, schemaMin, schemaUrl, schemaUuid } from './v/helpers.ts';
import { schemaDescription, schemaExample, schemaOpenapi } from './v/openapi.ts';
import { schemaArray, schemaDefault, schemaObject, schemaOptional } from './v/system.ts';

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
