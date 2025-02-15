import type { IDecoratorEventListenerOptions } from '../types/eventListener.js';
import { createBeanDecorator } from 'vona';

export function EventListener(options: IDecoratorEventListenerOptions): ClassDecorator {
  return createBeanDecorator('eventListener', options);
}
