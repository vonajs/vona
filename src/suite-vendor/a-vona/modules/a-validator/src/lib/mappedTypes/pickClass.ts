import { appMetadata, Constructable, getMappedClassMetadataKeys } from 'vona';

export function pickClass<T, K extends keyof T>(
  classRef: Constructable<T>,
  keys: K[],
): Constructable<Pick<T, (typeof keys)[number]>> {
  abstract class PickedClass {}
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
    appMetadata.defineMetadata(metadataKey, rulesNew, PickedClass.prototype);
  }
  return PickedClass as any;
}
