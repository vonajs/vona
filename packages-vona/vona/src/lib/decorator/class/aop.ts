import { appResource } from '../../../index.js';
import { Constructable, IDecoratorAopOptions } from '../index.js';
import { parseModuleName } from './util.js';

export function Aop(options: IDecoratorAopOptions): ClassDecorator {
  return function (target) {
    // module
    const module = parseModuleName();
    // add
    appResource.addAop({
      module,
      scene: 'aop',
      name: options.name,
      beanClass: target as unknown as Constructable,
      aop: true,
      aopMatch: options.match,
      gate: options.gate,
    });
  };
}
