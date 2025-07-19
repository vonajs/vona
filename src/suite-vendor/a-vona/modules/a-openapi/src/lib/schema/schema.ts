import type { Constructable } from 'vona';
import type { SchemaLike } from 'vona-module-a-openapiutils';
import type { ISchemaObjectOptions } from '../../types/decorator.ts';
import type { TypeOpenapiMetadata } from '../../types/rest.ts';
import { appMetadata, appResource, cast } from 'vona';
import { SymbolDecoratorRule } from 'vona-module-a-openapiutils';
import { z } from 'zod';
import { makeSchemaLikes } from './makeSchemaLikes.ts';

export function $schema(schemaLike: z.ZodSchema): z.ZodSchema;
export function $schema(classType: StringConstructor): z.ZodString;
export function $schema(classType: NumberConstructor): z.ZodNumber;
export function $schema(classType: BooleanConstructor): z.ZodBoolean;
export function $schema(classType: DateConstructor): z.ZodDate;
export function $schema(classType: BigIntConstructor): z.ZodBigInt;
export function $schema(classType: ArrayConstructor): z.ZodArray<z.ZodAny>;
export function $schema<T>(classType: Constructable<T>, options?: ISchemaObjectOptions): z.ZodSchema<T>;
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
  let schema = z.object(rules as z.ZodRawShape);
  if (options?.passthrough) schema = schema.passthrough() as any;
  if (options?.strict) schema = schema.strict() as any;
  // refId
  const beanOptions = appResource.getBean(classType);
  if (beanOptions) {
    const openapi: TypeOpenapiMetadata = cast(beanOptions.options)?.openapi;
    schema = schema.openapi(beanOptions.beanFullName, openapi);
  }
  return schema as any;
}

export function $schemaRef<T>(schemaLikes: SchemaLike[], classType: () => Constructable<T>, options?: ISchemaObjectOptions): z.ZodSchema<T>;
export function $schemaRef<T>(classType: () => Constructable<T>, options?: ISchemaObjectOptions): z.ZodSchema<T>;
export function $schemaRef<T>(schemaLikes: any, classType: any, options?: any): z.ZodSchema<T> {
  if (typeof schemaLikes === 'function') {
    options = classType;
    classType = schemaLikes;
    schemaLikes = [];
  }

  const classType2 = classType();
  return z.custom(async value => {
    const schema = makeSchemaLikes(schemaLikes, $schema(classType2, options));
    const res = await schema.safeParseAsync(value);
    // success/data
    return res;
  });
}
