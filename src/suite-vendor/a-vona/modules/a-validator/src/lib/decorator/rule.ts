import { appMetadata, MetadataKey, registerMappedClassMetadataKey } from 'vona';
import { z } from 'zod';

export const SymbolDecoratorRule = Symbol('SymbolDecoratorRule');

export function Rule(rule: z.ZodSchema): PropertyDecorator {
  return function (target: object, prop: MetadataKey) {
    registerMappedClassMetadataKey(target, SymbolDecoratorRule, {
      partialClass: (meta: z.ZodSchema) => {
        return meta.optional();
      },
    });
    const rules = appMetadata.getOwnMetadataMap(true, SymbolDecoratorRule, target);
    rules[prop] = rule;
  };
}
