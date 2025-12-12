import type { IDecoratorBeanOptionsBase } from 'vona';
import type { TypeHmrWatchScene } from '../types/hmr.ts';
import { BeanEventBase, Event } from 'vona-module-a-event';

export interface TypeEventHmrReloadData {
  sceneName: TypeHmrWatchScene;
  file: string;
  beanOptions?: IDecoratorBeanOptionsBase;
}

export type TypeEventHmrReloadResult = void;

@Event()
export class EventHmrReload extends BeanEventBase<
  TypeEventHmrReloadData,
  TypeEventHmrReloadResult
> {}
