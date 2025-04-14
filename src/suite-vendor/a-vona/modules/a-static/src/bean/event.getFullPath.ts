import type { IMiddlewareSystemOptionsStatic } from './middlewareSystem.static.ts';
import { BeanEventBase, Event } from 'vona-module-a-event';

export interface TypeEventGetFullPathData {
  dir: string;
  filename: string;
  options: IMiddlewareSystemOptionsStatic;
}

export type TypeEventGetFullPathResult = string | true | undefined;

@Event()
export class EventGetFullPath extends BeanEventBase<
  TypeEventGetFullPathData,
  TypeEventGetFullPathResult
> {}
