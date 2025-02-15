import type { IDecoratorEventOptions } from '../types/event.js';
import { createBeanDecorator } from 'vona';

export function Event(options?: IDecoratorEventOptions): ClassDecorator {
  return createBeanDecorator('event', options);
}
