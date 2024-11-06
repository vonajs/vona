import { appResource } from '../../../index.js';
import { Constructable, IDecoratorControllerOptions } from '../index.js';
import { parseModuleName } from './util.js';

export function Controller(options?: IDecoratorControllerOptions): ClassDecorator;
export function Controller(path?: string): ClassDecorator;
export function Controller(options?: IDecoratorControllerOptions | string): ClassDecorator {
  return function (target) {
    if (!options) options = {};
    if (typeof options === 'string') {
      options = { path: options } as unknown as IDecoratorControllerOptions;
    }
    // module
    const module = parseModuleName();
    // add
    appResource.addBean({
      module,
      scene: 'controller',
      name: undefined,
      beanClass: target as unknown as Constructable,
      options,
    });
  };
}
