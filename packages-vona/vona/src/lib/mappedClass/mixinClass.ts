import { Constructable } from '../decorator/type/constructable.js';
import { copyMetadataOfClasses } from './utils.js';

type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never;

type ClassRefsToConstructors<T extends Constructable[]> = {
  [U in keyof T]: T[U] extends Constructable<infer V> ? V : never;
};

type Intersection<T extends Constructable[]> = Constructable<UnionToIntersection<ClassRefsToConstructors<T>[number]>>;

export function mixinClass<T extends Constructable[]>(...classRefs: T): Intersection<T> {
  abstract class TargetClass {}
  copyMetadataOfClasses(
    TargetClass.prototype,
    classRefs.map(item => item.prototype),
  );
  return TargetClass as any;
}
