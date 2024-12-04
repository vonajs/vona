import { appMetadata } from '../core/metadata.js';
import { Constructable } from '../decorator/type/constructable.js';
import { getMappedClassMetadataKeys } from './utils.js';

type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never;

type ClassRefsToConstructors<T extends Constructable[]> = {
  [U in keyof T]: T[U] extends Constructable<infer V> ? V : never;
};

type Intersection<T extends Constructable[]> = Constructable<UnionToIntersection<ClassRefsToConstructors<T>[number]>>;

export function mixinClass<T extends Constructable[]>(...classRefs: T): Intersection<T> {
  abstract class TargetClass {}
  //
  const metadataKeys = {};
  for (const classRef of classRefs) {
    const _metadataKeys = getMappedClassMetadataKeys(classRef.prototype);
    if (_metadataKeys) {
      Object.assign(metadataKeys, _metadataKeys);
    }
  }
  //
  for (const metadataKey of Object.getOwnPropertySymbols(metadataKeys)) {
    const rulesNew = {};
    for (const classRef of classRefs) {
      const rules = appMetadata.getMetadata(metadataKey, classRef.prototype);
      if (!rules) continue;
      Object.assign(rulesNew, rules);
    }
    appMetadata.defineMetadata(metadataKey, rulesNew, TargetClass.prototype);
  }
  return TargetClass as any;
}
