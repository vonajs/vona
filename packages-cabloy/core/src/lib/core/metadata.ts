import 'reflect-metadata';
import { BeanBase, Constructable } from '../../index.js';

export type MetaDataKey = symbol | string;

export class AppMetadata extends BeanBase {
  defineMetaData<T, V>(metadataKey: MetaDataKey, metadataValue: V, target: Constructable<T>) {
    Reflect.defineMetadata(metadataKey, metadataValue, target);
  }

  getOwnMetaData<T, V>(metadataKey: MetaDataKey, target: Constructable<T>): V | undefined {
    return Reflect.getOwnMetadata(metadataKey, target);
  }
}

export const appMetadata = new AppMetadata();
