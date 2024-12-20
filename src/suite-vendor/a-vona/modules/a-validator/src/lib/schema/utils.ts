import { IpVersion, z, ZodTypeAny } from 'zod';
import { errorUtil } from '../zod/errorUtil.js';
import { ZodOpenAPIMetadata } from '@asteasolutions/zod-to-openapi';

export function schemaOpenapi<T extends ZodTypeAny>(metadata: Partial<ZodOpenAPIMetadata<z.input<T>>>);
export function schemaOpenapi<T extends ZodTypeAny>(refId: string, metadata?: Partial<ZodOpenAPIMetadata<z.input<T>>>);
export function schemaOpenapi<T extends ZodTypeAny>(refId: any, metadata?: any) {
  return function (schema: T): T {
    return schema.openapi(refId, metadata);
  };
}

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
