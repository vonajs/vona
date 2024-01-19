import { BeanBase, BeanModuleScopeBase, Local, TypeBeanScopeRecordKeys, Use } from '@cabloy/core';
import { __ThisModule__ } from '../types/this.js';
import { ScopeModule } from '../index.js';
import { BeanInstance } from 'cabloy-module-api-a-instance';

@Local()
export class LocalA extends BeanModuleScopeBase {
  @Use()
  testInstance: BeanInstance;

  @Use()
  testScope: ScopeModule;

  module(moduleScope: TypeBeanScopeRecordKeys): LocalA {
    return super.module(moduleScope);
  }

  actionSync() {
    return 'a';
  }
  getName() {
    // this.scope.local.version;
    const version = this.scope.module('a-instance').local.instance;
    // const version = this.testScope.module('a-version').local.version;
    // version = this.scope.local.version;
    console.log(this.scope.module, version);
    // this.ctx.bean['a-version.version.manager'].init;
    // this.ctx.local.version.__database;
    // this.bean.
    // this.ctx.bean.
    const aa = this.actionSync();
    console.log(aa);
    // const aa = this.module('test-party');
    // const bb = this.app.bean.local.user;
    // const cc = this.app.bean.local.module('test-party').aaa;
    console.log(this.moduleScope, __ThisModule__);
    if (this.moduleScope !== __ThisModule__) throw new Error();
    return this.moduleScope;
  }
}

@Local()
export class LocalB extends BeanBase {
  @Use()
  localA: LocalA;

  printName() {
    this.localA.module('a-version').getName();
    console.log(this.localA.getName());
  }
}
