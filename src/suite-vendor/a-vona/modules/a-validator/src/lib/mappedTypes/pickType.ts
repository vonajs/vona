import { appMetadata, Type } from 'vona';
import { SymbolDecoratorRule } from '../decorator/rule.js';

export function pickType<T, K extends keyof T>(classRef: Type<T>, keys: K[]): Type<Pick<T, (typeof keys)[number]>> {
  abstract class PickTypeClass {}
  const rules = appMetadata.getMetadata(SymbolDecoratorRule, classRef.prototype);
  const rulesNew = {};
  if (rules) {
    for (const key in rules) {
      if (keys.includes(key as any)) {
        rulesNew[key] = rules[key];
      }
    }
  }
  appMetadata.defineMetadata(SymbolDecoratorRule, rulesNew, PickTypeClass.prototype);
  return PickTypeClass as any;
}
