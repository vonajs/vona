import type { VonaApplication } from 'vona';
import { OpenApiGeneratorV3, OpenApiGeneratorV31, OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import { setSchemaRefCustom, SymbolSchemaRef } from '@cabloy/zod-query';
import { cast } from 'vona';
import { createSchemaRef } from '../schema/schema.ts';

export function schemaRefCustomAdapter(_app: VonaApplication) {
  setSchemaRefCustom((params: any[]) => {
    return createSchemaRef(params);
  });

  const registry = new OpenAPIRegistry();
  const generator30 = new OpenApiGeneratorV3(registry.definitions);
  _patchGenerator(generator30);
  const generator31 = new OpenApiGeneratorV31(registry.definitions);
  _patchGenerator(generator31);
}

class Metadata {
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

  static getInternalMetadata(zodSchema) {
    const innerSchema = this.unwrapChained(zodSchema);
    const openapi = zodSchema._def.openapi
      ? zodSchema._def.openapi
      : innerSchema._def.openapi;
    return openapi === null || openapi === void 0 ? void 0 : openapi._internal;
  }

  static getSchemaRefParams(zodSchema) {
    const innerSchema = this.unwrapChained(zodSchema);
    return zodSchema._def?.[SymbolSchemaRef] ?? innerSchema._def?.[SymbolSchemaRef];
  }

  static getRefId(zodSchema) {
    let _a;
    // eslint-disable-next-line
    return (_a = this.getInternalMetadata(zodSchema)) === null || _a === void 0 ? void 0 : _a.refId;
  }
}

function _patchGenerator(generator: any) {
  const gen = Object.getPrototypeOf(cast(generator).generator);
  gen.generateSchemaWithRef = function (zodSchema) {
    // schema ref
    const schemaRefParams = Metadata.getSchemaRefParams(zodSchema);
    if (schemaRefParams) {
      zodSchema = createSchemaRef(schemaRefParams);
    }
    const refId = Metadata.getRefId(zodSchema);
    if (!refId) {
      return this.generateSimpleSchema(zodSchema);
    }
    if (this.schemaRefs[refId] === undefined) {
      this.schemaRefs[refId] = null;
      const result = this.generateSimpleSchema(zodSchema);
      this.schemaRefs[refId] = result;
    }
    return { $ref: this.generateSchemaRef(refId) };
  };
  console.log(gen);
}

function isZodType(schema, typeName) {
  let _a;
  // eslint-disable-next-line
  return ((_a = schema === null || schema === void 0 ? void 0 : schema._def) === null || _a === void 0 ? void 0 : _a.typeName) === typeName;
}
