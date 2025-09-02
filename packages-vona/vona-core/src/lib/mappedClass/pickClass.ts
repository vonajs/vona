import type { Constructable } from '../decorator/type/constructable.ts';
import type { TypePickClass } from './pickClassInner.ts';
import { PickClassInner } from './pickClassInner.ts';

export function PickClass<T, KEYS extends Array<keyof T> | undefined = undefined>(
  classRef: Constructable<T>,
  keys?: KEYS,
): TypePickClass<T, KEYS> {
  abstract class TargetClass {}
  return PickClassInner(TargetClass as any, classRef, keys);
}
