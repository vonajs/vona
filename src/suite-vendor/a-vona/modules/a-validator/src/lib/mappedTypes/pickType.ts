import { appMetadata, getMappedClassMetadataKeys, Type } from 'vona';

export function pickType<T, K extends keyof T>(classRef: Type<T>, keys: K[]): Type<Pick<T, (typeof keys)[number]>> {
  abstract class PickTypeClass {}
  const metadataKeys = getMappedClassMetadataKeys(classRef.prototype) || [];
  for (const metadataKey of metadataKeys) {
    const rulesNew = {};
    const rules = appMetadata.getMetadata(metadataKey, classRef.prototype);
    if (rules) {
      for (const key in rules) {
        if (keys.includes(key as any)) {
          rulesNew[key] = rules[key];
        }
      }
    }
    appMetadata.defineMetadata(metadataKey, rulesNew, PickTypeClass.prototype);
  }
  return PickTypeClass as any;
}
