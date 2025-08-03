import type { Constructable } from '../decorator/type/constructable.ts';
import { PickClassInner } from './pickClassInner.ts';

export function PickClass<T>(
  classRef: Constructable<T>,
  keys?: undefined,
): Constructable<T>;
export function PickClass<T, K extends keyof T>(
  classRef: Constructable<T>,
  keys: K[],
): Constructable<Pick<T, (typeof keys)[number]>>;
export function PickClass<T, K extends keyof T>(
  classRef: Constructable<T>,
  keys?: K[],
) {
  abstract class TargetClass {}
  return PickClassInner(TargetClass as any, classRef, keys as any);
}
