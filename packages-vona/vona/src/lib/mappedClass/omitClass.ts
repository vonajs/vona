import { appMetadata } from '../core/metadata.js';
import { Constructable } from '../decorator/type/constructable.js';
import { getMappedClassMetadataKeys } from './utils.js';

export function omitClass<T, K extends keyof T>(
  classRef: Constructable<T>,
  keys: K[],
): Constructable<Omit<T, (typeof keys)[number]>> {
  abstract class OmitedClass {}
  const metadataKeys = getMappedClassMetadataKeys(classRef.prototype);
  if (metadataKeys) {
    for (const metadataKey of Object.getOwnPropertySymbols(metadataKeys)) {
      const rulesNew = {};
      const rules = appMetadata.getMetadata(metadataKey, classRef.prototype);
      if (rules) {
        for (const key in rules) {
          if (!keys.includes(key as any)) {
            rulesNew[key] = rules[key];
          }
        }
      }
      appMetadata.defineMetadata(metadataKey, rulesNew, OmitedClass.prototype);
    }
  }
  return OmitedClass as any;
}
