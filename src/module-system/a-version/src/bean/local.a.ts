import { BeanBase, BeanModuleScopeBase, Local, Use } from '@cabloy/core';
import { __ThisModule__ } from '../types/this.js';
// import { BeanInstance } from 'cabloy-module-api-a-instance';

@Local()
export class LocalA extends BeanModuleScopeBase {
  // @Use()
  // testInstance: BeanInstance;

  actionSync() {
    return 'a';
  }
  getName() {
    const version = this.scope.module('a-version').local.version;
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
    console.log(this.localA.getName());
  }
}
