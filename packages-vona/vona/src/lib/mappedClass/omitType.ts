import { appMetadata, Type } from 'vona';
import { SymbolDecoratorRule } from '../decorator/rule.js';

export function omitType<T, K extends keyof T>(classRef: Type<T>, keys: K[]): Type<Omit<T, (typeof keys)[number]>> {
  abstract class OmitTypeClass {}
  const rules = appMetadata.getMetadata(SymbolDecoratorRule, classRef.prototype);
  const rulesNew = {};
  if (rules) {
    for (const key in rules) {
      if (!keys.includes(key as any)) {
        rulesNew[key] = rules[key];
      }
    }
  }
  appMetadata.defineMetadata(SymbolDecoratorRule, rulesNew, OmitTypeClass.prototype);
  return OmitTypeClass as any;
}
