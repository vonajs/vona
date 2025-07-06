import type { Constructable } from '../../lib/decorator/type/constructable.ts';

export interface Type<T = any> extends Function {
  new (...args: any[]): T;
}

export type TypeClassOfClassLike<ClassLike> = ClassLike extends ((() => Constructable<infer Result>) | Constructable<infer Result>) ? Result : never;
