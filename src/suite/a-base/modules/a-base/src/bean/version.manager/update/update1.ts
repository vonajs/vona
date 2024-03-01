import { BeanBase } from '@cabloy/core';

import update1Data from './update1Data.js';

export class VersionUpdate extends BeanBase {
  async run() {
    // tables
    const tableNames = [
      'aUser',
      'aUserAgent',
      'aAuthProvider',
      'aAuth',
      'aRole',
      'aRoleInc',
      'aUserRole',
      'aRoleRight',
      'aAtomClass',
      'aAtom',
      'aAtomAction',
      'aLabel',
      'aAtomLabel',
      'aAtomLabelRef',
      'aAtomStar',
      'aRoleRef',
      'aRoleIncRef',
      'aRoleExpand',
      'aRoleRightRef',
      'aFunction',
      'aFunctionStar',
      'aFunctionLocale',
      'aRoleFunction',
    ];

    for (const tableName of tableNames) {
      const fn = update1Data.tables[tableName];
      await fn(this.bean.model);
    }

    // views
    const viewNames = [
      'aViewUserRoleRef',
      'aViewUserRoleExpand',
      'aViewUserRightAtomClass',
      'aViewUserRightAtomClassUser',
      'aViewUserRightAtom',
      'aViewUserRightFunction',
    ];
    for (const viewName of viewNames) {
      await this.ctx.model.query(update1Data.views[viewName]);
    }

    // functions
    const functionNames: any[] = [];
    for (const functionName of functionNames) {
      await this.ctx.model.query(update1Data.functions[functionName]);
    }
  }
}
