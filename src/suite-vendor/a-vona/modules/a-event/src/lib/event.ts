import { createBeanDecorator } from 'vona';
import { IDecoratorEventOptions } from '../types/event.js';

export function Event(options?: IDecoratorEventOptions): ClassDecorator {
  return createBeanDecorator('event', options);
}
