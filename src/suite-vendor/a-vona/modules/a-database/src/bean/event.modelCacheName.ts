import type { BeanModel } from './bean.model.ts';
import { BeanEventBase, Event } from 'vona-module-a-event';

export interface TypeEventModelCacheNameData {
  beanModel: BeanModel;
}

export type TypeEventModelCacheNameResult = string;

@Event()
export class EventModelCacheName extends BeanEventBase<
  TypeEventModelCacheNameData,
  TypeEventModelCacheNameResult
> {}
