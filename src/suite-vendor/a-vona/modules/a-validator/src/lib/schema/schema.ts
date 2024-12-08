import { appMetadata, Constructable } from 'vona';
import { ValidatorOptions } from '../types/validatorOptions.js';
import { z } from 'zod';
import { SymbolDecoratorRule } from '../decorator/rule.js';

export function schema(classType: StringConstructor): z.ZodString;
export function schema(classType: NumberConstructor): z.ZodNumber;
export function schema(classType: BooleanConstructor): z.ZodBoolean;
export function schema(classType: DateConstructor): z.ZodDate;
export function schema(classType: BigIntConstructor): z.ZodBigInt;
export function schema<T>(classType: Constructable<T>, options?: Partial<ValidatorOptions>): z.ZodSchema<T>;
export function schema(classType: any, options?: Partial<ValidatorOptions>): any {
  if (classType.name === 'String') return z.string();
  if (classType.name === 'Number') return z.number();
  if (classType.name === 'Boolean') return z.boolean();
  if (classType.name === 'Date') return z.date();
  if (classType.name === 'BigInt') return z.bigint();
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
