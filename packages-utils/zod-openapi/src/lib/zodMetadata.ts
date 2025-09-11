import type { ZodOpenAPIInternalMetadata } from '@asteasolutions/zod-to-openapi/dist/zod-extensions.js';
import type z from 'zod';
import { isZodType, Metadata } from '@asteasolutions/zod-to-openapi';

export class ZodMetadata {
  static unwrapUntil(schema, typeName?) {
    return (Metadata as any).unwrapUntil(schema, typeName);
  }

  static unwrapChained(schema: z.ZodType): z.ZodType {
    return Metadata.unwrapChained(schema);
  }

  static getDefaultValue<T>(zodSchema: z.ZodType): T | undefined {
    return Metadata.getDefaultValue(zodSchema);
  }

  static getInternalMetadata<T>(zodSchema: z.ZodType<T>): ZodOpenAPIInternalMetadata | undefined {
    return Metadata.getInternalMetadata(zodSchema);
  }

  static getLazySchema<T>(zodSchema: z.ZodType<T>) {
    const innerSchema = this.unwrapChained(zodSchema) as z.ZodLazy;
    return (zodSchema as z.ZodLazy)._zod.def.getter ?? innerSchema._zod.def.getter;
  }

  static getRefId<T>(zodSchema: z.ZodType<T>): string | undefined {
    return Metadata.getRefId(zodSchema);
  }

  static getFieldSchema(schema: any, key: string): z.ZodType {
    return schema.shape[key];
  }

  static getOpenapiMetadata<T>(zodSchema: z.ZodType<T>) {
    return Metadata.getOpenApiMetadata(zodSchema);
  }

  static isZodType<T>(schema: z.ZodType<T>, typeNames: string | string[]): boolean {
    return isZodType(schema, typeNames);
  }
}
