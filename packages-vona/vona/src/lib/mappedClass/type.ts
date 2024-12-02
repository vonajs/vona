import { appMetadata, MetadataKey } from '../core/metadata.js';

export const SymbolMappedClassMetadataKeys = Symbol('SymbolMappedClassMetakeys');

export function registerMappedClassMetadataKey(target: object, metadataKey: MetadataKey) {
  const metadataKeys = appMetadata.getOwnMetadataArray<MetadataKey>(true, SymbolMappedClassMetadataKeys, target);
  if (!metadataKeys.includes(metadataKey)) {
    metadataKeys.push(metadataKey);
  }
}

export function getMappedClassMetadataKeys(target: object): MetadataKey[] | undefined {
  return appMetadata.getMetadata<MetadataKey[]>(SymbolMappedClassMetadataKeys, target);
}
