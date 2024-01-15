import { BeanBase, appResource } from '../../../index.js';
import { BeanConstructable, IDecoratorLocalOptions } from '../index.js';
import { parseModuleName } from './util.js';

export function Local<T extends BeanBase>(options: IDecoratorLocalOptions<T>): ClassDecorator {
  return function (target) {
    // module
    const module = parseModuleName();
    // add
    appResource.addBean({
      module,
      scene: 'local',
      name: options.name,
      scope: options.scope,
      beanClass: target as unknown as BeanConstructable<T>,
    });
  };
}
