import { appMetadata } from '../core/metadata.js';
import { Constructable } from '../decorator/type/constructable.js';
import { getMappedClassMetadataKeys } from './utils.js';

export function partialClass<T>(classRef: Constructable<T>): Constructable<Partial<T>>;
export function partialClass<T, K extends keyof T>(
  classRef: Constructable<T>,
  keys: K[],
): Constructable<Partial<Pick<T, (typeof keys)[number]>> & Omit<T, (typeof keys)[number]>>;
export function partialClass<T, K extends keyof T>(classRef: Constructable<T>, keys?: K[]): any {
  abstract class PartialedClass {}
  const metadataKeys = getMappedClassMetadataKeys(classRef.prototype);
  if (metadataKeys) {
    for (const metadataKey of Object.getOwnPropertySymbols(metadataKeys)) {
      const metadataKeyOptions = metadataKeys[metadataKey];
      const rulesNew = {};
      const rules = appMetadata.getMetadata(metadataKey, classRef.prototype);
      if (rules) {
        for (const key in rules) {
          if (!keys || keys.includes(key as any)) {
            if (metadataKeyOptions?.partialClass) {
              rulesNew[key] = metadataKeyOptions?.partialClass?.(rules[key]);
            } else {
              rulesNew[key] = rules[key];
            }
          } else {
            rulesNew[key] = rules[key];
          }
        }
      }
      appMetadata.defineMetadata(metadataKey, rulesNew, PartialedClass.prototype);
    }
  }
  return PartialedClass as any;
}
