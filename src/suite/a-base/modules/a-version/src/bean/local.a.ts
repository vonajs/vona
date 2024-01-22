import { BeanModuleScopeBase, Local, TypeBeanScopeRecordKeys, Use } from '@cabloy/core';
import { __ThisModule__ } from '../types/this.js';
import { ScopeModule } from '../index.js';
import type { LocalB } from '../index.js';
import { BeanInstance } from 'cabloy-module-api-a-instance';
// import { BeanInstance } from 'cabloy-module-api-a-instance';
// import { BeanInstance } from 'cabloy-module-api-a-instance';
// import { ScopeModule as ScopeModuleInstance } from 'cabloy-module-api-a-instance';

@Local()
export class LocalA extends BeanModuleScopeBase {
  @Use({ beanFullName: 'a-version.local.b' })
  localB: LocalB;

  get localB2(): LocalB {
    return this.bean._getBean('a-version.local.b');
  }

  @Use()
  scope: ScopeModule;

  @Use()
  testInstance: BeanInstance;

  @Use()
  testScope: ScopeModule;

  module(moduleScope: TypeBeanScopeRecordKeys): LocalA {
    return super.module(moduleScope) as LocalA;
  }

  actionSync() {
    return 'a';
  }
  getName() {
    // const scopeOther: ScopeModule = this.bean.scope(__ThisModule__);
    // console.log('scopeOther3:', scopeOther.local.version);
    // return;
    // const fail = this.ctx.text.locale('zh-cn', 'ModuleOld', '-a-version-');
    let fail = this.scope.locale.ModuleOld();
    fail = this.scope.locale.ModuleOld('-a-version-');
    fail = this.scope.locale.ModuleOld.locale('zh-cn', '-a-version-');
    fail = this.scope.constant.atom.stage.formal.toString();
    // this.scope.local.version
    // fail = this.scope.config.startups.databaseName.bean;
    // const fail = this.ctx.parseFail(403, 'a-version');
    // const fail = this.scope.error.ModuleOld.throw('a-version');
    console.log(fail);
    return;
    // return;
    // this.scope.local.version;
    const version = this.bean.scope('a-instance').local.instance;
    // const version = this.testScope.module('a-version').local.version;
    // version = this.scope.local.version;
    console.log(this.bean.scope, version);
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
