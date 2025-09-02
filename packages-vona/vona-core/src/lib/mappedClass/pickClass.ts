import type { Constructable } from '../decorator/type/constructable.ts';
import { PickClassInner } from './pickClassInner.ts';

export function PickClass<T, KEYS extends Array<keyof T> | undefined = undefined>(
  classRef: Constructable<T>,
  keys?: KEYS,
): KEYS extends any[] ? Constructable<Pick<T, KEYS[number]>> : Constructable<T> {
  abstract class TargetClass {}
  return PickClassInner(TargetClass as any, classRef, keys as any);
}
