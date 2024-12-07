import { IDecoratorStartupOptions } from '../../../index.js';
import { createBeanDecorator } from '../index.js';

export function Startup(options?: IDecoratorStartupOptions): ClassDecorator {
  return createBeanDecorator('startup', options);
}
