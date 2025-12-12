import type { IDecoratorBeanOptionsBase } from 'vona';
import { BeanEventBase, Event } from 'vona-module-a-event';

export interface TypeEventHmrReloadData { sceneName: string; file: string; beanOptions?: IDecoratorBeanOptionsBase }

export type TypeEventHmrReloadResult = void;

@Event()
export class EventHmrReload extends BeanEventBase<
  TypeEventHmrReloadData,
  TypeEventHmrReloadResult
> {}
