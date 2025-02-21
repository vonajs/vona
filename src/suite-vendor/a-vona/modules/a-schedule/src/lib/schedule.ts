import type { IDecoratorScheduleOptions } from '../types/schedule.ts';
import { createBeanDecorator } from 'vona';

export function Schedule(options?: IDecoratorScheduleOptions): ClassDecorator {
  return createBeanDecorator('schedule', options);
}
