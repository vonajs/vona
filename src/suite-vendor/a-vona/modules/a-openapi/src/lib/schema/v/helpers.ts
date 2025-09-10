import type { ISchemaObjectExtensionFieldCaptcha } from '../../../types/captcha.ts';
import type { errorUtil } from '../../zod/errorUtil.ts';
import { useApp } from 'vona';
import { z } from 'zod';

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

export function schemaMin(min: number, params?: errorUtil.ErrMessage) {
  return function (schema: any): any {
    return schema.min(min, message);
  };
}

export function schemaMax(max: number, params?: errorUtil.ErrMessage) {
  return function (schema: any): any {
    return schema.max(max, message);
  };
}

export function schemaTableIdentity() {
  const app = useApp();
  const ormConfig = app.util.getModuleConfigRaw('a-orm');
  const _identityType = ormConfig?.table.identityType ?? 'string';
  return function (_schema?: any): any {
    if (_identityType === 'string') {
      return z.string();
    } else if (_identityType === 'number') {
      return z.number();
    }
    throw new Error('not support');
  };
}

export function schemaBigNumber() {
  return function (_schema: any): any {
    return z.union([z.string(), z.number()]);
  };
}

export function schemaCaptcha(options: ISchemaObjectExtensionFieldCaptcha) {
  return function (schema: z.ZodType): any {
    return schema.openapi({ captcha: options });
  };
}
