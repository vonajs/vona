import type { ZodOpenAPIMetadata } from '@cabloy/zod-to-openapi';
import type { z } from 'zod';

export function schemaOpenapi<T extends z.ZodType>(metadata: Partial<ZodOpenAPIMetadata<z.input<T>>>): T;
export function schemaOpenapi<T extends z.ZodType>(refId: string, metadata?: Partial<ZodOpenAPIMetadata<z.input<T>>>): T;
export function schemaOpenapi<T extends z.ZodType>(refId: any, metadata?: any) {
  return function (schema: T): T {
    return schema.openapi(refId, metadata);
  };
}

export function schemaTitle<T extends z.ZodType>(title?: string) {
  return function (schema: T): T {
    return schema.openapi({ title });
  };
}

export function schemaDescription<T extends z.ZodType>(description?: string) {
  return function (schema: T): T {
    return schema.openapi({ description });
  };
}

export function schemaExample<T extends z.ZodType>(example?: any) {
  return function (schema: T): T {
    return schema.openapi({ example });
  };
}
