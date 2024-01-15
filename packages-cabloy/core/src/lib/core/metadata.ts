import 'reflect-metadata';
import { BeanBase, BeanConstructable } from '../../index.js';

export type MetaDataKey = symbol | string;

export class AppMetadata extends BeanBase {
  defineMetaData<T, V>(metadataKey: MetaDataKey, metadataValue: V, target: BeanConstructable<T>) {
    Reflect.defineMetadata(metadataKey, metadataValue, target);
  }

  getOwnMetaData<T, V>(metadataKey: MetaDataKey, target: BeanConstructable<T>): V | undefined {
    return Reflect.getOwnMetadata(metadataKey, target);
  }
}

export const appMetadata = new AppMetadata();
