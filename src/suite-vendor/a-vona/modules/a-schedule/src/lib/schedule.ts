import { createBeanDecorator } from 'vona';
import type { IDecoratorScheduleOptions } from '../types/schedule.js';

export function Schedule(options?: IDecoratorScheduleOptions): ClassDecorator {
  return createBeanDecorator('schedule', options);
}
