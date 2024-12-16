import { createBeanDecorator } from 'vona';
import { IDecoratorEventListenerOptions } from '../types/eventListener.js';

export function EventListener(options: IDecoratorEventListenerOptions): ClassDecorator {
  return createBeanDecorator('eventListener', options);
}
