import type { Constructable } from '../decorator/type/constructable.ts';
import { copyMetadataOfClasses, copyPropertiesOfClasses } from './utils.ts';

export type TypePartialClass<T, KEYS extends Array<keyof T> | undefined = undefined> =
  KEYS extends any[] ? Constructable<Partial<Pick<T, KEYS[number]>> & Omit<T, KEYS[number]>> : Constructable<Partial<T>>;

export function PartialClass<T>(
  classRef: Constructable<T>,
): Constructable<Partial<T>>;
export function PartialClass<T, KEYS extends Array<keyof T>>(
  classRef: Constructable<T>,
  keys: KEYS,
): Constructable<Partial<Pick<T, KEYS[number]>> & Omit<T, KEYS[number]>>;
export function PartialClass<T, KEYS extends Array<keyof T> | undefined = undefined>(
  classRef: Constructable<T>,
  keys?: KEYS,
): TypePartialClass<T, KEYS> {
  abstract class TargetClass {}
  copyMetadataOfClasses(TargetClass.prototype, [classRef.prototype], (rules, key, metadataKeyOptions) => {
    if (keys && !keys.includes(key)) return rules[key];
    if (metadataKeyOptions?.partialClass) {
      return metadataKeyOptions?.partialClass(rules[key]);
    }
    return rules[key];
  });
  copyPropertiesOfClasses(TargetClass as any, [classRef]);
  return TargetClass as any;
}
