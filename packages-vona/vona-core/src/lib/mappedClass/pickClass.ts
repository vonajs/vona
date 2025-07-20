import type { Constructable } from '../decorator/type/constructable.ts';
import { copyMetadataOfClasses, copyPropertiesOfClasses } from './utils.ts';

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
  copyMetadataOfClasses(TargetClass.prototype, [classRef.prototype], (rules, key) => {
    if (!keys || keys.includes(key)) {
      return rules[key];
    }
  });
  copyPropertiesOfClasses(TargetClass as any, [classRef], key => {
    return !keys || keys.includes(key);
  });
  return TargetClass as any;
}
