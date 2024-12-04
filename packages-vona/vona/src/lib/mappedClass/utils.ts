import { appMetadata, MetadataKey } from '../core/metadata.js';
import { Constructable } from '../decorator/index.js';
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

export function copyPropertiesOfClasses(target: Constructable, sources: Constructable[], filter?: Function) {
  for (const source of sources) {
    copyProperties(target, source, ['constructor', 'prototype', 'name'], filter); // copy static
    copyProperties(target.prototype, source.prototype, ['constructor', 'prototype'], filter); // copy prototype
  }
}

export function copyProperties(target: object, source: object, keysIgnore: MetadataKey[], filter?: Function) {
  // todo: loop prototype
  for (const key of Reflect.ownKeys(source)) {
    if (keysIgnore.includes(key)) continue;
    if (filter && !filter(key)) continue;
    const desc = Object.getOwnPropertyDescriptor(source, key)!;
    Object.defineProperty(target, key, desc);
  }
}

export function copyMetadataOfClasses(target: object, sources: object[], transform?: Function) {
  //
  const metadataKeys = {};
  for (const source of sources) {
    const _metadataKeys = getMappedClassMetadataKeys(source);
    if (_metadataKeys) {
      Object.assign(metadataKeys, _metadataKeys);
    }
  }
  //
  for (const metadataKey of Object.getOwnPropertySymbols(metadataKeys)) {
    const metadataKeyOptions = metadataKeys[metadataKey];
    const rulesNew = {};
    for (const source of sources) {
      const rules = appMetadata.getMetadata(metadataKey, source);
      if (!rules) continue;
      if (!transform) {
        Object.assign(rulesNew, rules);
      } else {
        for (const key in rules) {
          const ruleNew = transform(rules, key, metadataKeyOptions);
          if (ruleNew !== undefined) {
            rulesNew[key] = ruleNew;
          }
        }
      }
    }
    appMetadata.defineMetadata(metadataKey, rulesNew, target);
  }
}
