import { appMetadata, cast, Type } from 'vona';
import { SymbolDecoratorRule } from '../decorator/rule.js';
import { z } from 'zod';

export function partialType<T>(classRef: Type<T>): Type<Partial<T>>;
export function partialType<T, K extends keyof T>(
  classRef: Type<T>,
  keys: K[],
): Type<Partial<Pick<T, (typeof keys)[number]>> & Omit<T, (typeof keys)[number]>>;
export function partialType<T, K extends keyof T>(classRef: Type<T>, keys?: K[]): any {
  abstract class PartialTypeClass {}
  const rules = appMetadata.getMetadata(SymbolDecoratorRule, classRef.prototype);
  const rulesNew = {};
  if (rules) {
    for (const key in rules) {
      if (!keys || keys.includes(key as any)) {
        rulesNew[key] = cast<z.ZodSchema>(rules[key]).optional();
      } else {
        rulesNew[key] = rules[key];
      }
    }
  }
  appMetadata.defineMetadata(SymbolDecoratorRule, rulesNew, PartialTypeClass.prototype);
  return PartialTypeClass as any;
}
