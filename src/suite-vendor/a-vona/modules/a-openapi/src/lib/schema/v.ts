import { schemaCaptcha, schemaEmail, schemaIPv4, schemaIPv6, schemaLowercase, schemaMax, schemaMin, schemaRegex, schemaSerializerExclude, schemaSerializerGetter, schemaSerializerSensitive, schemaSerializerTransform, schemaTableIdentity, schemaToLowerCase, schemaToUpperCase, schemaTrim, schemaUppercase, schemaUrl, schemaUuid } from './v/helpers.ts';
import { schemaDescription, schemaExample, schemaOpenapi, schemaTitle } from './v/openapi.ts';
import { schemaArray, schemaDefault, schemaLazy, schemaLooseObject, schemaObject, schemaOptional, schemaRequired, schemaStrictObject } from './v/system.ts';
import { schemaZodRefine, schemaZodTransform } from './v/zod.ts';

export const v = {
  required: schemaRequired,
  optional: schemaOptional,
  default: schemaDefault,
  object: schemaObject,
  strictObject: schemaStrictObject,
  looseObject: schemaLooseObject,
  array: schemaArray,
  lazy: schemaLazy,
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
  captcha: schemaCaptcha,
  serializerExclude: schemaSerializerExclude,
  serializerTransform: schemaSerializerTransform,
  serializerSensitive: schemaSerializerSensitive,
  serializerGetter: schemaSerializerGetter,
  // openapi
  openapi: schemaOpenapi,
  title: schemaTitle,
  description: schemaDescription,
  example: schemaExample,
  // zod
  refine: schemaZodRefine,
  transform: schemaZodTransform,
};
