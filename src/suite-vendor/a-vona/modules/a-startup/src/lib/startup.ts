import type { IDecoratorStartupOptions } from '../types/startup.ts';
import { createBeanDecorator } from 'vona';

export function Startup(options?: IDecoratorStartupOptions): ClassDecorator {
  return createBeanDecorator('startup', options);
}
