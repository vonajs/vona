import type { IDecoratorEventListenerOptions } from '../types/eventListener.ts';
import { createBeanDecorator } from 'vona';

export function EventListener(options: IDecoratorEventListenerOptions): ClassDecorator {
  return createBeanDecorator('eventListener', options);
}
