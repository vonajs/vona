import { schemaBigNumber, schemaCaptcha, schemaEmail, schemaIPv4, schemaMax, schemaMin, schemaTableIdentity, schemaUrl, schemaUuid } from './v/helpers.ts';
import { schemaDescription, schemaExample, schemaOpenapi, schemaTitle } from './v/openapi.ts';
import { schemaArray, schemaDefault, schemaLazy, schemaObject, schemaOptional } from './v/system.ts';
import { schemaZodRefine } from './v/zod.ts';

export const v = {
  lazy: schemaLazy,
  array: schemaArray,
  default: schemaDefault,
  object: schemaObject,
  optional: schemaOptional,
  // helpers
  email: schemaEmail,
  url: schemaUrl,
  uuid: schemaUuid,
  ipv4: schemaIPv4,
  ipv6: schemaIPv6,
  min: schemaMin,
  max: schemaMax,
  tableIdentity: schemaTableIdentity,
  bigNumber: schemaBigNumber,
  captcha: schemaCaptcha,
  // openapi
  openapi: schemaOpenapi,
  title: schemaTitle,
  description: schemaDescription,
  example: schemaExample,
  // zod
  refine: schemaZodRefine,
};
