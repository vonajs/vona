import { appResource, IDecoratorPacketOptions } from '../../../index.js';
import { Constructable } from '../index.js';
import { parseModuleName } from './util.js';

export function Packet<T extends IDecoratorPacketOptions>(options?: T): ClassDecorator {
  return function (target) {
    // module
    const module = parseModuleName();
    // add
    appResource.addBean({
      module,
      scene: 'packet',
      name: undefined,
      beanClass: target as unknown as Constructable,
      options,
    });
  };
}
