import { BeanBase, Local, Use } from '@cabloy/core';
import { LocalA } from './a.js';
import { ScopeModule } from 'cabloy-module-api-a-instance';

@Local()
export class LocalB extends BeanBase {
  @Use()
  localA: LocalA;

  @Use()
  scopeInstance: ScopeModule;

  async printName() {
    const modelInstance = this.scopeInstance.model.instance;
    const items = await modelInstance.columns();
    // const items = await this.ctx.model.module('a-instance').instance.select({});
    console.log(items);
    this.localA.module('a-version').getName();
    console.log(this.localA.getName());
  }
}
