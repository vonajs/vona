import { appMetadata, Type } from 'vona';
import { SymbolDecoratorRule } from '../decorator/rule.js';

type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never;

type ClassRefsToConstructors<T extends Type[]> = {
  [U in keyof T]: T[U] extends Type<infer V> ? V : never;
};

type Intersection<T extends Type[]> = Type<UnionToIntersection<ClassRefsToConstructors<T>[number]>>;

export function intersectionType<T extends Type[]>(...classRefs: T): Intersection<T> {
  abstract class IntersectionTypeClass {}
  const rulesNew = {};
  for (const classRef of classRefs) {
    const rules = appMetadata.getMetadata(SymbolDecoratorRule, classRef.prototype);
    if (!rules) continue;
    Object.assign(rulesNew, rules);
  }
  appMetadata.defineMetadata(SymbolDecoratorRule, rulesNew, IntersectionTypeClass.prototype);
  return IntersectionTypeClass as any;
}
