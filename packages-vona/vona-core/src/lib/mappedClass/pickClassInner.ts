import type { Constructable } from '../decorator/type/constructable.ts';
import { copyMetadataOfClasses, copyPropertiesOfClasses } from './utils.ts';

export function PickClassInner<T>(
  classTarget: Constructable,
  classRef: Constructable<T>,
  keys?: undefined,
): Constructable<T>;
export function PickClassInner<T, K extends keyof T>(
  classTarget: Constructable,
  classRef: Constructable<T>,
  keys: K[],
): Constructable<Pick<T, (typeof keys)[number]>>;
export function PickClassInner<T, K extends keyof T>(
  classTarget: Constructable,
  classRef: Constructable<T>,
  keys?: K[],
) {
  copyMetadataOfClasses(classTarget.prototype, [classRef.prototype], (rules, key) => {
    if (!keys || keys.includes(key)) {
      return rules[key];
    }
  });
  copyPropertiesOfClasses(classTarget as any, [classRef], key => {
    return !keys || keys.includes(key);
  });
  return classTarget as any;
}
