import { createBeanDecorator } from 'vona';
import type { IDecoratorEventOptions } from '../types/event.js';

export function Event(options?: IDecoratorEventOptions): ClassDecorator {
  return createBeanDecorator('event', options);
}
