import { BeanBase, CabloyContext, IModuleMainContext } from '@cabloy/core';

export class Main extends BeanBase implements IModuleMainContext {
  createContext(context: CabloyContext): void {
    Object.defineProperty(context, 'db', {
      enumerable: false,
      get() {
        return context.dbMeta.transaction.inTransaction
          ? context.dbMeta.transaction.connection
          : context.bean.database.getDbOriginal();
      },
    });
  }
}
