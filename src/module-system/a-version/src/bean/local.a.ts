import { BeanBase, BeanModuleBase, Local, Use } from '@cabloy/core';
import { __ThisModule__ } from '../types/this.js';

@Local()
export class LocalA extends BeanModuleBase {
  actionSync() {
    return 'a';
  }
  getName() {
    this.ctx.bean['a-version.version.manager'].init;
    this.ctx.local.version.__database;
    const aa = this.actionSync();
    //const aa = this.module('test-party');
    //const bb = this.app.bean.local.user;
    //const cc = this.app.bean.local.module('test-party').aaa;
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
