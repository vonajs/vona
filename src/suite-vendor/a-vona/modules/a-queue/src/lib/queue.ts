import type { IDecoratorQueueOptions } from '../types/queue.ts';
import { createBeanDecorator } from 'vona';

export function Queue(options?: IDecoratorQueueOptions): ClassDecorator {
  return createBeanDecorator('queue', options);
}
