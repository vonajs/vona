import type { ZodTypes } from '@cabloy/zod-to-openapi/dist/lib/zod-is-type.js';
import type { ZodOpenAPIInternalMetadata } from '@cabloy/zod-to-openapi/dist/zod-extensions.js';
import type z from 'zod';
import { isZodType, Metadata } from '@cabloy/zod-to-openapi';

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

  static isZodType<TypeName extends keyof ZodTypes>(schema: object, typeNames: TypeName[]): schema is ZodTypes[TypeName];
  static isZodType<TypeName extends keyof ZodTypes>(schema: object, typeName: TypeName): schema is ZodTypes[TypeName];
  static isZodType<TypeName extends keyof ZodTypes>(schema: object, typeNames: TypeName | TypeName[]): boolean {
    return isZodType(schema, typeNames as any);
  }
}
