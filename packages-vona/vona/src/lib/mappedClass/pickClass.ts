import { appMetadata } from '../core/metadata.js';
import { Constructable } from '../decorator/type/constructable.js';
import { getMappedClassMetadataKeys } from './utils.js';

export function pickClass<T, K extends keyof T>(
  classRef: Constructable<T>,
  keys: K[],
): Constructable<Pick<T, (typeof keys)[number]>> {
  abstract class TargetClass {}
  const metadataKeys = getMappedClassMetadataKeys(classRef.prototype);
  if (metadataKeys) {
    for (const metadataKey of Object.getOwnPropertySymbols(metadataKeys)) {
      const rulesNew = {};
      const rules = appMetadata.getMetadata(metadataKey, classRef.prototype);
      if (rules) {
        for (const key in rules) {
          if (keys.includes(key as any)) {
            rulesNew[key] = rules[key];
          }
        }
      }
      appMetadata.defineMetadata(metadataKey, rulesNew, TargetClass.prototype);
    }
  }
  return TargetClass as any;
}
