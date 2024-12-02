import { appMetadata, MetadataKey } from '../core/metadata.js';
import { IMappedClassMetadataOptions, MappedClassMetadataKeys, SymbolMappedClassMetadataKeys } from './type.js';

export function registerMappedClassMetadataKey(
  target: object,
  metadataKey: MetadataKey,
  options?: IMappedClassMetadataOptions,
) {
  const metadataKeys = appMetadata.getOwnMetadataMap<MetadataKey, IMappedClassMetadataOptions | undefined>(
    true,
    SymbolMappedClassMetadataKeys,
    target,
  );
  if (!Object.hasOwn(metadataKeys, metadataKey)) {
    metadataKeys[metadataKey] = options;
  }
}

export function getMappedClassMetadataKeys(target: object): MappedClassMetadataKeys | undefined {
  return appMetadata.getMetadata<MappedClassMetadataKeys>(SymbolMappedClassMetadataKeys, target);
}
