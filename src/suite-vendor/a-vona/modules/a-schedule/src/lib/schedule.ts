import type { IDecoratorScheduleOptions } from '../types/schedule.js';
import { createBeanDecorator } from 'vona';

export function Schedule(options?: IDecoratorScheduleOptions): ClassDecorator {
  return createBeanDecorator('schedule', options);
}
