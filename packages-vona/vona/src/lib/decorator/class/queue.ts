import { IDecoratorQueueOptions } from '../../../index.js';
import { createBeanDecorator } from '../index.js';

export function Queue(options?: IDecoratorQueueOptions): ClassDecorator {
  return createBeanDecorator('queue', options);
}
