import { createBeanDecorator } from 'vona';
import { IDecoratorControllerOptions } from '../../types/controller.js';

export function Controller(options?: IDecoratorControllerOptions): ClassDecorator;
export function Controller(path?: string): ClassDecorator;
export function Controller(options?: IDecoratorControllerOptions | string): ClassDecorator {
  if (!options) options = {};
  if (typeof options === 'string') {
    options = { path: options } as unknown as IDecoratorControllerOptions;
  }
  return createBeanDecorator('controller', options);
}

export function Service(): ClassDecorator {
  return createBeanDecorator('service');
}

export function Dto(): ClassDecorator {
  return createBeanDecorator('dto');
}
