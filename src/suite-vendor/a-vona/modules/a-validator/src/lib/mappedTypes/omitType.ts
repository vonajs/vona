import { appMetadata, Type } from 'vona';
import { SymbolDecoratorRule } from '../decorator/rule.js';

export function omitType<T, K extends keyof T>(
  classRef: Type<T>,
  keys: readonly K[],
): Type<Omit<T, (typeof keys)[number]>> {
  const omitedType: any = function () {};
  omitedType.prototype = classRef.prototype;
  const rules = appMetadata.getOwnMetadataMap(SymbolDecoratorRule, classRef);
  appMetadata.defineMetadata(SymbolDecoratorRule, rules, omitedType);
  return omitedType;
}
