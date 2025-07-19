import { schemaEmail, schemaIp, schemaMax, schemaMin, schemaTableIdentity, schemaUrl, schemaUuid } from './v/helpers.ts';
import { schemaDescription, schemaExample, schemaOpenapi, schemaTitle } from './v/openapi.ts';
import { schemaArray, schemaDefault, schemaObject, schemaOptional, schemaRef } from './v/system.ts';

export const v = {
  ref: schemaRef,
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
  tableIdentity: schemaTableIdentity,
  // openapi
  openapi: schemaOpenapi,
  title: schemaTitle,
  description: schemaDescription,
  example: schemaExample,
};
