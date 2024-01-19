import { appResource } from '../../../index.js';
import { Constructable, IDecoratorAopOptions } from '../index.js';
import { parseModuleName } from './util.js';

export function Aop<T>(options: IDecoratorAopOptions): ClassDecorator {
  return function (target) {
    // module
    const module = parseModuleName();
    // add
    appResource.addAop({
      module,
      scene: 'aop',
      name: options.name,
      containerScope: options.containerScope,
      beanClass: target as unknown as Constructable<T>,
      aop: true,
      aopMatch: options.match,
    });
  };
}
