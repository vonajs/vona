import { schemaBigNumber, schemaCaptcha, schemaEmail, schemaIPv4, schemaIPv6, schemaLowercase, schemaMax, schemaMin, schemaRegex, schemaSerializerSensitive, schemaSerializerTransform, schemaTableIdentity, schemaToLowerCase, schemaToUpperCase, schemaTrim, schemaUppercase, schemaUrl, schemaUuid } from './v/helpers.ts';
import { schemaDescription, schemaExample, schemaOpenapi, schemaTitle } from './v/openapi.ts';
import { schemaArray, schemaDefault, schemaLazy, schemaLooseObject, schemaObject, schemaOptional, schemaStrictObject } from './v/system.ts';
import { schemaZodRefine, schemaZodTransform } from './v/zod.ts';

export const v = {
  lazy: schemaLazy,
  array: schemaArray,
  default: schemaDefault,
  object: schemaObject,
  optional: schemaOptional,
  strictObject: schemaStrictObject,
  looseObject: schemaLooseObject,
  // helpers
  email: schemaEmail,
  url: schemaUrl,
  uuid: schemaUuid,
  ipv4: schemaIPv4,
  ipv6: schemaIPv6,
  min: schemaMin,
  max: schemaMax,
  trim: schemaTrim,
  toLowerCase: schemaToLowerCase,
  toUpperCase: schemaToUpperCase,
  lowercase: schemaLowercase,
  uppercase: schemaUppercase,
  regex: schemaRegex,
  tableIdentity: schemaTableIdentity,
  bigNumber: schemaBigNumber,
  captcha: schemaCaptcha,
  serializerTransform: schemaSerializerTransform,
  serializerSensitive: schemaSerializerSensitive,
  // openapi
  openapi: schemaOpenapi,
  title: schemaTitle,
  description: schemaDescription,
  example: schemaExample,
  // zod
  refine: schemaZodRefine,
  transform: schemaZodTransform,
};
