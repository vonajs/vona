import { appMetadata, MetadataKey } from 'vona';
import { z } from 'zod';

export const SymbolDecoratorRule = Symbol('SymbolDecoratorRule');

export function Rule(rule: z.ZodSchema): PropertyDecorator {
  return function (target: object, prop: MetadataKey) {
    const rules = appMetadata.getOwnMetadataMap(SymbolDecoratorRule, target);
    rules[prop] = rule;
  };
}

export { z as RuleType };
