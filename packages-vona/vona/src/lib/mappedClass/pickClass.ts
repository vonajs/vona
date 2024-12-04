import { Constructable } from '../decorator/type/constructable.js';
import { copyMetadataOfClasses } from './utils.js';

export function pickClass<T, K extends keyof T>(
  classRef: Constructable<T>,
  keys: K[],
): Constructable<Pick<T, (typeof keys)[number]>> {
  abstract class TargetClass {}
  copyMetadataOfClasses(TargetClass.prototype, [classRef.prototype], (rules, key) => {
    if (keys.includes(key as any)) {
      return rules[key];
    }
  });
  return TargetClass as any;
}
