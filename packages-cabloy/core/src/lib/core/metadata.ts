import 'reflect-metadata';
import { BeanBase, BeanConstructable } from '../../index.js';

export type MetaDataKey = symbol | string;

export class AppMetadata extends BeanBase {
  defineMetaData<T>(metadataKey: MetaDataKey, metadataValue: T, target: BeanConstructable) {
    Reflect.defineMetadata(metadataKey, metadataValue, target);
  }
}

export const appMetadata = new AppMetadata();
