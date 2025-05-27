import type { ZodOpenAPIMetadata } from '@asteasolutions/zod-to-openapi';
import type { z, ZodTypeAny } from 'zod';

export function schemaOpenapi<T extends ZodTypeAny>(metadata: Partial<ZodOpenAPIMetadata<z.input<T>>>);
export function schemaOpenapi<T extends ZodTypeAny>(refId: string, metadata?: Partial<ZodOpenAPIMetadata<z.input<T>>>);
export function schemaOpenapi<T extends ZodTypeAny>(refId: any, metadata?: any) {
  return function (schema: T): T {
    return schema.openapi(refId, metadata);
  };
}

export function schemaTitle<T extends ZodTypeAny>(title?: string) {
  return function (schema: T): T {
    return schema.openapi({ title });
  };
}

export function schemaDescription<T extends ZodTypeAny>(description?: string) {
  return function (schema: T): T {
    return schema.openapi({ description });
  };
}

export function schemaExample<T extends ZodTypeAny>(example?: any) {
  return function (schema: T): T {
    return schema.openapi({ example });
  };
}
