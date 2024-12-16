import { createBeanDecorator } from 'vona';
import { IDecoratorEventEmitterOptions } from '../types/eventEmitter.js';

export function EventEmitter(options?: IDecoratorEventEmitterOptions): ClassDecorator {
  return createBeanDecorator('eventEmitter', options);
}
