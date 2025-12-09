import type { Constructable } from '../decorator/type/constructable.ts';
import { PickClassInner } from './pickClassInner.ts';

export function ExtendClass<T>(classRef: Constructable<T>): Constructable<T> {
  abstract class TargetClass {}
  return PickClassInner(TargetClass as any, classRef);
}
