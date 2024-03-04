import { BeanBase, IDecoratorModelOptions, IModelOptions, appResource } from '@cabloy/core';

// @ts-ignore ignore TRecord
export class BeanModelInner<TRecord extends {}, TResult> extends BeanBase {
  protected get __beanOptions() {
    return appResource.getBean((<any>this).__beanFullName__);
  }

  protected get __modelOptions() {
    const beanOptions = this.__beanOptions;
    return beanOptions?.options as IDecoratorModelOptions;
  }

  get table(): string {
    return this.__modelOptions?.table;
  }

  get options(): IModelOptions {
    return this.__modelOptions?.options;
  }

  get disableDeleted() {
    return this.options?.disableDeleted === undefined
      ? this.app.config.model.disableDeleted
      : this.options?.disableDeleted;
  }

  get disableInstance() {
    return this.options?.disableInstance === undefined
      ? this.app.config.model.disableInstance
      : this.options?.disableInstance;
  }
}
