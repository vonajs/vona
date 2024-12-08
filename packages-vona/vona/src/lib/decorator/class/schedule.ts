import { IDecoratorScheduleOptions } from '../../../index.js';
import { createBeanDecorator } from '../index.js';

export function Schedule(options?: IDecoratorScheduleOptions): ClassDecorator {
  return createBeanDecorator('schedule', options);
}
