import { createBeanDecorator } from 'vona';
import type { IDecoratorStartupOptions } from '../types/startup.js';

export function Startup(options?: IDecoratorStartupOptions): ClassDecorator {
  return createBeanDecorator('startup', options);
}
