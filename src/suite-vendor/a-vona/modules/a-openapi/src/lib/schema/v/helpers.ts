import type { ISerializerTransformRecord, TypeSerializerTransformGetter } from 'vona-module-a-serialization';
import type { ISchemaObjectExtensionFieldCaptcha } from '../../../types/captcha.ts';
import { useApp } from 'vona';
import { z } from 'zod';
import { $locale } from '../../../.metadata/index.ts';

export function schemaRequired(params?: string | z.core.$ZodStringParams) {
  params = params || $locale('ZodErrorRequired');
  return function (schema: z.ZodType): z.ZodType {
    schema._zod.def.error = z.util.normalizeParams(params).error;
    return schema;
  };
}

export function schemaEmail(params?: string | z.core.$ZodEmailParams) {
  return function (_schema: z.ZodString): z.ZodEmail {
    return z.email(params);
  };
}

export function schemaUrl(params?: string | z.core.$ZodURLParams) {
  return function (_schema: z.ZodString): z.ZodURL {
    return z.url(params);
  };
}

export function schemaUuid(params?: string | z.core.$ZodUUIDParams) {
  return function (_schema: z.ZodString): z.ZodUUID {
    return z.uuid(params);
  };
}

export function schemaIPv4(params?: string | z.core.$ZodIPv4Params) {
  return function (_schema: z.ZodString): z.ZodIPv4 {
    return z.ipv4(params);
  };
}

export function schemaIPv6(params?: string | z.core.$ZodIPv6Params) {
  return function (_schema: z.ZodString): z.ZodIPv6 {
    return z.ipv6(params);
  };
}

export function schemaMin(min: number, params?: string | z.core.$ZodCheckMinLengthParams | z.core.$ZodCheckGreaterThanParams) {
  return function (schema: z.ZodString | z.ZodNumber): z.ZodString | z.ZodNumber {
    if (schema.type === 'string') {
      return schema.min(min, params as string | z.core.$ZodCheckMinLengthParams);
    } else {
      return schema.min(min, params as string | z.core.$ZodCheckGreaterThanParams);
    }
  };
}

export function schemaMax(max: number, params?: string | z.core.$ZodCheckMaxLengthParams | z.core.$ZodCheckLessThanParams) {
  return function (schema: z.ZodString | z.ZodNumber): z.ZodString | z.ZodNumber {
    if (schema.type === 'string') {
      return schema.max(max, params as string | z.core.$ZodCheckMaxLengthParams);
    } else {
      return schema.max(max, params as string | z.core.$ZodCheckLessThanParams);
    }
  };
}

export function schemaTrim() {
  return function (schema: z.ZodString): z.ZodString {
    return schema.trim();
  };
}

export function schemaToLowerCase() {
  return function (schema: z.ZodString): z.ZodString {
    return schema.toLowerCase();
  };
}

export function schemaToUpperCase() {
  return function (schema: z.ZodString): z.ZodString {
    return schema.toUpperCase();
  };
}

export function schemaLowercase(params?: string | z.core.$ZodCheckLowerCaseParams) {
  return function (schema: z.ZodString): z.ZodString {
    return schema.lowercase(params);
  };
}

export function schemaUppercase(params?: string | z.core.$ZodCheckUpperCaseParams) {
  return function (schema: z.ZodString): z.ZodString {
    return schema.uppercase(params);
  };
}

export function schemaRegex(regex: RegExp, params?: string | z.core.$ZodCheckRegexParams) {
  return function (schema: z.ZodString): z.ZodString {
    return schema.regex(regex, params);
  };
}

export function schemaTableIdentity() {
  const app = useApp();
  const ormConfig = app.util.getModuleConfigRaw('a-orm');
  const _identityType = ormConfig?.table?.identityType ?? 'bigint';
  return function (_schema?: any): z.ZodString | z.ZodNumber {
    if (_identityType === 'string') {
      return z.string();
    } else if (_identityType === 'number') {
      return z.number();
    } else if (_identityType === 'bigint') {
      return z.string().regex(/^\d+$/);
    }
    throw new Error('not support');
  };
}

export function schemaCaptcha(options: ISchemaObjectExtensionFieldCaptcha) {
  return function (schema: z.ZodType): z.ZodType {
    return schema.openapi({ captcha: options });
  };
}

export function schemaSerializerExclude() {
  return function (schema: z.ZodType): z.ZodType {
    return schema.openapi({ exclude: true });
  };
}

export function schemaSerializerTransform<T extends keyof ISerializerTransformRecord>(
  serializerTransformName: T,
  options?: Partial<ISerializerTransformRecord[T]>,
) {
  return function (schema: z.ZodType): z.ZodType {
    return schema.openapi({
      serializerTransforms: {
        [serializerTransformName]: options,
      },
    });
  };
}

export function schemaSerializerSensitive(
  options: ISerializerTransformRecord['a-serialization:sensitive'],
) {
  return function (schema: z.ZodType): z.ZodType {
    return schema.openapi({
      serializerTransforms: {
        'a-serialization:sensitive': options,
      },
    });
  };
}

export function schemaSerializerGetter(getter: TypeSerializerTransformGetter) {
  return function (schema: z.ZodType): z.ZodType {
    return schema.openapi({
      serializerTransforms: {
        'a-serialization:getter': { getter },
      },
    });
  };
}
