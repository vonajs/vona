import { parseModuleName } from '@cabloy/module-info';
import { IDecoratorBeanOptionsBase } from '../decorator/index.js';
import { BeanBase } from '../module/bean/beanBase.js';

export class AppResource extends BeanBase {
  beans: Record<string, IDecoratorBeanOptionsBase> = {};

  addBean<T>(options: Partial<IDecoratorBeanOptionsBase<T>>) {
    // module
    if (!options.module) throw new Error(`module name not parsed for bean: ${options.scene}.${options.name}`);
    // fullName
    const fullName = options.scene ? `${module}.${options.scene}.${options.name}` : options.name;
    // options
    const beanOptions: IDecoratorBeanOptionsBase<T> = {
      fullName: fullName!,
      module: options.module,
      scene: options.scene,
      name: options.name!,
      scope: options.scope,
      beanClass: options.beanClass!,
    };
    this.beans[fullName!] = beanOptions;
    // set metadata
    this.
  }
}

export const appResource = new AppResource();
