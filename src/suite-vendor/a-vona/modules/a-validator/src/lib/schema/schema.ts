import { appMetadata, Constructable } from 'vona';
import { ValidatorOptions } from '../types/validatorOptions.js';
import { z } from 'zod';
import { SymbolDecoratorRule } from '../decorator/rule.js';

export function schema<T>(classType: Constructable<T>, options?: Partial<ValidatorOptions>): z.ZodSchema<T> {
  const rules = appMetadata.getMetadata(SymbolDecoratorRule, classType.prototype);
  let schema = z.object((rules as z.ZodRawShape) || {});
  if (options?.passthrough) schema = schema.passthrough() as any;
  if (options?.strict) schema = schema.strict() as any;
  return schema as any;
}
