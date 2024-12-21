import { appMetadata, Constructable } from 'vona';
import { ISchemaObjectOptions } from '../types/validatorOptions.js';
import { z } from 'zod';
import { SymbolDecoratorRule } from '../decorator/rule.js';

export function schema(schemaLike: z.ZodSchema): z.ZodSchema;
export function schema(classType: StringConstructor): z.ZodString;
export function schema(classType: NumberConstructor): z.ZodNumber;
export function schema(classType: BooleanConstructor): z.ZodBoolean;
export function schema(classType: DateConstructor): z.ZodDate;
export function schema(classType: BigIntConstructor): z.ZodBigInt;
export function schema(classType: ArrayConstructor): z.ZodArray<z.ZodAny>;
export function schema<T>(classType: Constructable<T>, options?: ISchemaObjectOptions): z.ZodSchema<T>;
export function schema(classType: any, options?: ISchemaObjectOptions): any {
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
  return schema as any;
}
