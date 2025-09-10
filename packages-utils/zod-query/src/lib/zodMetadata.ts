import type z from 'zod';

export class ZodMetadata {
  static unwrapUntil(schema, typeName?) {
    if (typeName && isZodType(schema, typeName)) {
      return schema;
    }
    if (isZodType(schema, 'ZodOptional') ||
      isZodType(schema, 'ZodNullable') ||
      isZodType(schema, 'ZodBranded')) {
      return this.unwrapUntil(schema.unwrap(), typeName);
    }
    if (isZodType(schema, 'ZodDefault') || isZodType(schema, 'ZodReadonly')) {
      return this.unwrapUntil(schema._def.innerType, typeName);
    }
    if (isZodType(schema, 'ZodEffects')) {
      return this.unwrapUntil(schema._def.schema, typeName);
    }
    if (isZodType(schema, 'ZodPipeline')) {
      return this.unwrapUntil(schema._def.in, typeName);
    }
    return typeName ? undefined : schema;
  }

  static unwrapChained(schema) {
    return this.unwrapUntil(schema);
  }

  static getDefaultValue(zodSchema) {
    const unwrapped = this.unwrapUntil(zodSchema, 'ZodDefault');
    return unwrapped === null || unwrapped === void 0 ? void 0 : unwrapped._def.defaultValue();
  }

  static getInternalMetadata(zodSchema) {
    const innerSchema = this.unwrapChained(zodSchema);
    const openapi = zodSchema._def.openapi
      ? zodSchema._def.openapi
      : innerSchema._def.openapi;
    return openapi === null || openapi === void 0 ? void 0 : openapi._internal;
  }

  static getLazySchema(zodSchema) {
    const innerSchema = this.unwrapChained(zodSchema);
    return zodSchema._def?.getter ?? innerSchema._def?.getter;
  }

  static getRefId(zodSchema) {
    let _a;
    // eslint-disable-next-line
    return (_a = this.getInternalMetadata(zodSchema)) === null || _a === void 0 ? void 0 : _a.refId;
  }

  static getFieldSchema(schema: any, key: string): z.ZodType {
    return schema.shape[key];
  }

  static getOpenapiMetadata(schema: any) {
    return schema._def.openapi?.metadata;
  }
}

export function isZodType(schema, typeName) {
  let _a;
  // eslint-disable-next-line
  return ((_a = schema === null || schema === void 0 ? void 0 : schema._def) === null || _a === void 0 ? void 0 : _a.typeName) === typeName;
}
