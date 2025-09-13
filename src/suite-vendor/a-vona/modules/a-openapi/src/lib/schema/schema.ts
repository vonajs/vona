import type { Constructable } from 'vona';
import type { SchemaLike } from 'vona-module-a-openapiutils';
import type { ISchemaObjectOptions } from '../../types/decorator.ts';
import type { TypeOpenapiMetadata } from '../../types/rest.ts';
import { appMetadata, appResource, cast } from 'vona';
import { SymbolDecoratorRule } from 'vona-module-a-openapiutils';
import { z } from 'zod';
import { prepareClassType } from '../utils.ts';
import { makeSchemaLikes } from './makeSchemaLikes.ts';
import { SymbolSchemaDynamicRefId } from './schemaDynamic.ts';

export function $schema<T>(schemaLike: z.ZodType<T>): z.ZodType<T>;
export function $schema(classType: StringConstructor): z.ZodString;
export function $schema(classType: NumberConstructor): z.ZodNumber;
export function $schema(classType: BooleanConstructor): z.ZodBoolean;
export function $schema(classType: DateConstructor): z.ZodDate;
export function $schema(classType: BigIntConstructor): z.ZodBigInt;
export function $schema(classType: ArrayConstructor): z.ZodArray<z.ZodAny>;
export function $schema<T>(classType: Constructable<T>, options?: ISchemaObjectOptions): z.ZodType<T>;
export function $schema(classType: any, options?: ISchemaObjectOptions): any {
  if (!classType) return z.any();
  if (classType.parseAsync) return classType;
  if (classType.name === 'String') return z.string();
  if (classType.name === 'Number') return z.number();
  if (classType.name === 'Boolean') return z.boolean();
  if (classType.name === 'Date') return z.date();
  if (classType.name === 'BigInt') return z.bigint();
  if (classType.name === 'Array') return z.array(z.any());
  // check if object
  const rules = classType.prototype ? appMetadata.getMetadata(SymbolDecoratorRule, classType.prototype) : undefined;
  if (!rules) {
    // not object
    return z.any();
  }
  // object
  let schema = _createSchemaObject(rules, options);
  // refId
  const schemaDynamicRefId = classType[SymbolSchemaDynamicRefId];
  if (schemaDynamicRefId) {
    // dynamic
    schema = schema.openapi(schemaDynamicRefId);
  } else {
    // static
    const beanOptions = appResource.getBean(classType);
    if (beanOptions) {
      const pipes: SchemaLike | SchemaLike[] = cast(beanOptions.options)?.pipes;
      if (pipes) {
        schema = makeSchemaLikes(pipes, schema) as any;
      }
      const openapi: TypeOpenapiMetadata = cast(beanOptions.options)?.openapi;
      schema = schema.openapi(beanOptions.beanFullName, openapi);
    }
  }
  return schema as any;
}

export function $schemaLazy<T>(...schemaLikes: SchemaLike<T>[]): z.ZodType<T> {
  return z.lazy(() => {
    return _createSchemaLazy(schemaLikes);
  });
}

function _createSchemaLazy<T>(schemaLikes: SchemaLike<T>[]): z.ZodType<T> {
  const classType = schemaLikes[schemaLikes.length - 1];
  schemaLikes = schemaLikes.slice(0, schemaLikes.length - 1);
  const classType2 = prepareClassType(classType as any);
  return makeSchemaLikes(schemaLikes, $schema(classType2));
}

function _createSchemaObject(rules: {}, options?: ISchemaObjectOptions) {
  let schema = z.object(rules as z.ZodRawShape);
  if (options?.loose) schema = z.looseObject(schema.shape) as any;
  if (options?.strict) schema = z.strictObject(schema.shape) as any;
  return schema;
}
