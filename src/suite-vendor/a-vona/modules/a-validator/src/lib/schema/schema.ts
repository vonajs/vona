import { appMetadata, Constructable } from 'vona';
import { ValidatorOptions } from '../types/validatorOptions.js';
import { z } from 'zod';
import { SymbolDecoratorRule } from '../decorator/rule.js';

export function schema(classType: StringConstructor): z.ZodNumber;
export function schema(classType: NumberConstructor): z.ZodNumber;
export function schema(classType: BooleanConstructor): z.ZodNumber;
export function schema(classType: DateConstructor): z.ZodNumber;
export function schema<T>(classType: Constructable<T>, options?: Partial<ValidatorOptions>): z.ZodSchema<T>;
export function schema(classType: any, options?: Partial<ValidatorOptions>): any {
  if (classType.name === 'String') return z.string();
  if (classType.name === 'Number') return z.number();
  if (classType.name === 'Boolean') return z.boolean();
  if (classType.name === 'Date') return z.date();
  // object
  const rules = appMetadata.getMetadata(SymbolDecoratorRule, classType.prototype);
  let schema = z.object((rules as z.ZodRawShape) || {});
  if (options?.passthrough) schema = schema.passthrough() as any;
  if (options?.strict) schema = schema.strict() as any;
  return schema as any;
}
