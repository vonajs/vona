import 'reflect-metadata';
import { BeanBase, Constructable } from '../../index.js';

export type MetaDataKey = symbol | string;

export class AppMetadata {
  defineMetaData<T, V>(metadataKey: MetaDataKey, metadataValue: V, target: Constructable<T>) {
    Reflect.defineMetadata(metadataKey, metadataValue, target);
  }

  getOwnMetaData<T, V>(metadataKey: MetaDataKey, target: Constructable<T>): V | undefined {
    return Reflect.getOwnMetadata(metadataKey, target);
  }

  getMetaData<T, V>(metadataKey: MetaDataKey, target: Constructable<T>, prop?: string | symbol): V | undefined {
    if (prop) {
      return Reflect.getMetadata(metadataKey, target, prop);
    }
    return Reflect.getMetadata(metadataKey, target);
  }

  getOwnMetaDataArray<T, Entry>(metadataKey: MetaDataKey, target: Constructable<T>): Array<Entry> {
    let own: Array<Entry> | undefined = this.getOwnMetaData(metadataKey, target);
    if (!own) {
      const parent: Array<Entry> | undefined = this.getMetaData(metadataKey, target);
      if (parent) {
        own = parent.slice();
      } else {
        own = [];
      }
      this.defineMetaData(metadataKey, own, target);
    }
    return own;
  }

  getOwnMetaDataMap<T, K extends PropertyKey, V>(metadataKey: MetaDataKey, target: Constructable<T>): Record<K, V> {
    let own: Record<K, V> | undefined = this.getOwnMetaData(metadataKey, target);
    if (!own) {
      const parent: Record<K, V> | undefined = this.getMetaData(metadataKey, target);
      if (parent) {
        own = Object.assign({}, parent);
      } else {
        own = {} as Record<K, V>;
      }
      this.defineMetaData(metadataKey, own, target);
    }
    return own;
  }

  getDesignType<T>(target: Constructable<T>, prop?: string | symbol) {
    return this.getMetaData('design:type', target, prop);
  }
}

export const appMetadata = new AppMetadata();
