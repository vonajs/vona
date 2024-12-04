import { Constructable } from '../decorator/type/constructable.js';
import { copyMetadataOfClasses } from './utils.js';

export function partialClass<T>(classRef: Constructable<T>): Constructable<Partial<T>>;
export function partialClass<T, K extends keyof T>(
  classRef: Constructable<T>,
  keys: K[],
): Constructable<Partial<Pick<T, (typeof keys)[number]>> & Omit<T, (typeof keys)[number]>>;
export function partialClass<T, K extends keyof T>(classRef: Constructable<T>, keys?: K[]): any {
  abstract class TargetClass {}
  copyMetadataOfClasses(TargetClass.prototype, [classRef.prototype], (rules, key, metadataKeyOptions) => {
    if (keys && !keys.includes(key as any)) return rules[key];
    if (metadataKeyOptions?.partialClass) {
      return metadataKeyOptions?.partialClass(rules[key]);
    }
    return rules[key];
  });
  return TargetClass as any;
}
