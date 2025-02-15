import type { IDecoratorStartupOptions } from '../types/startup.js';
import { createBeanDecorator } from 'vona';

export function Startup(options?: IDecoratorStartupOptions): ClassDecorator {
  return createBeanDecorator('startup', options);
}
