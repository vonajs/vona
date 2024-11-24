import { appMetadata, Cast, Type } from 'vona';
import { SymbolDecoratorRule } from '../decorator/rule.js';
import { z } from 'zod';

export function partialType<T, K extends keyof T>(
  classRef: Type<T>,
  keys?: K[],
): Type<Omit<T, typeof keys extends [] ? (typeof keys)[number] : never>> {
  abstract class PartialTypeClass {}
  const rules = appMetadata.getOwnMetadataMap(SymbolDecoratorRule, classRef.prototype);
  const rulesNew = {};
  if (rules) {
    for (const key in rules) {
      if (!keys || keys.includes(key as any)) {
        rulesNew[key] = Cast<z.ZodSchema>(rules[key]).optional();
      } else {
        rulesNew[key] = rules[key];
      }
    }
  }
  appMetadata.defineMetadata(SymbolDecoratorRule, rulesNew, PartialTypeClass.prototype);
  return PartialTypeClass as any;
}
