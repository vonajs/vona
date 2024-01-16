import 'reflect-metadata';
import { BeanBase, Constructable } from '../../index.js';

export type MetadataKey = symbol | string;

export class AppMetadata {
  defineMetadata<T, V>(metadataKey: MetadataKey, metadataValue: V, target: Constructable<T>) {
    Reflect.defineMetadata(metadataKey, metadataValue, target);
  }

  getOwnMetadata<T, V>(metadataKey: MetadataKey, target: Constructable<T>): V | undefined {
    return Reflect.getOwnMetadata(metadataKey, target);
  }

  getMetadata<T, V>(metadataKey: MetadataKey, target: Constructable<T>, prop?: MetadataKey): V | undefined {
    if (prop) {
      return Reflect.getMetadata(metadataKey, target, prop);
    }
    return Reflect.getMetadata(metadataKey, target);
  }

  getOwnMetadataArray<T, Entry>(metadataKey: MetadataKey, target: Constructable<T>): Array<Entry> {
    let own: Array<Entry> | undefined = this.getOwnMetadata(metadataKey, target);
    if (!own) {
      const parent: Array<Entry> | undefined = this.getMetadata(metadataKey, target);
      if (parent) {
        own = parent.slice();
      } else {
        own = [];
      }
      this.defineMetadata(metadataKey, own, target);
    }
    return own;
  }

  getOwnMetadataMap<T, K extends PropertyKey, V>(metadataKey: MetadataKey, target: Constructable<T>): Record<K, V> {
    let own: Record<K, V> | undefined = this.getOwnMetadata(metadataKey, target);
    if (!own) {
      const parent: Record<K, V> | undefined = this.getMetadata(metadataKey, target);
      if (parent) {
        own = Object.assign({}, parent);
      } else {
        own = {} as Record<K, V>;
      }
      this.defineMetadata(metadataKey, own, target);
    }
    return own;
  }

  getDesignType(target: Object, prop?: MetadataKey) {
    return this.getMetadata('design:type', target as any, prop);
  }
}

export const appMetadata = new AppMetadata();
