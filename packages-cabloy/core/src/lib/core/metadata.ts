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

  getMetaData<T, V>(metadataKey: MetaDataKey, target: Constructable<T>, propKey?: PropertyKey): V | undefined {
    return Reflect.getMetadata(metadataKey, target, propKey as string);
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
}

export const appMetadata = new AppMetadata();
