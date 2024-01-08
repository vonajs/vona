const update1Data = require('./update1Data.js');

module.exports = class VersionUpdate {
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
      await this.ctx.model.query(update1Data.tables[tableName]);
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
    const functionNames = [];
    for (const functionName of functionNames) {
      await this.ctx.model.query(update1Data.functions[functionName]);
    }
  }
};
