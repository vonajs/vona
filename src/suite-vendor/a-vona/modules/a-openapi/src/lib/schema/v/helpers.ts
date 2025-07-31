import type { IpVersion } from 'zod';
import type { errorUtil } from '../../zod/errorUtil.ts';
import { z } from 'zod';

export function schemaEmail(message?: errorUtil.ErrMessage) {
  return function (schema: z.ZodString): z.ZodString {
    return schema.email(message);
  };
}

export function schemaUrl(message?: errorUtil.ErrMessage) {
  return function (schema: z.ZodString): z.ZodString {
    return schema.url(message);
  };
}

export function schemaUuid(message?: errorUtil.ErrMessage) {
  return function (schema: z.ZodString): z.ZodString {
    return schema.uuid(message);
  };
}

export function schemaIp(
  options?:
    | string
    | {
      version?: IpVersion;
      message?: string;
    },
) {
  return function (schema: z.ZodString): z.ZodString {
    return schema.ip(options);
  };
}

export function schemaMin(min: number, message?: errorUtil.ErrMessage) {
  return function (schema: any): any {
    return schema.min(min, message);
  };
}

export function schemaMax(max: number, message?: errorUtil.ErrMessage) {
  return function (schema: any): any {
    return schema.max(max, message);
  };
}

export function schemaTableIdentity() {
  return function (_schema: any): any {
    return z.union([z.string(), z.number()]);
  };
}

export function schemaBigNumber() {
  return function (_schema: any): any {
    return z.union([z.string(), z.number()]);
  };
}
