import { BeanBase, CabloyContext, IModule, IModuleMain, IModuleMainContext } from '@cabloy/core';
import { LocalDbMeta } from './local/local.dbMeta.js';
import { ExtendKnex } from './extend/index.js';

const DATABASEMETA = Symbol.for('Context#__databasemeta');

export class Main extends BeanBase implements IModuleMainContext, IModuleMain {
  createContext(context: CabloyContext): void {
    // db
    Object.defineProperty(context, 'db', {
      enumerable: false,
      get() {
        return context.dbMeta.transaction.inTransaction
          ? context.dbMeta.transaction.connection
          : context.bean.database.getDefault();
      },
    });
    // dbMeta
    Object.defineProperty(context, 'dbMeta', {
      enumerable: false,
      get() {
        if (!context[DATABASEMETA]) {
          context[DATABASEMETA] = context.bean._newBean(LocalDbMeta);
        }
        return context[DATABASEMETA];
      },
      set(metaCaller: LocalDbMeta) {
        // transaction
        if (metaCaller.transaction.inTransaction) {
          context.dbMeta.master = false; // false only on metaCaller.transaction=true
          context.dbMeta.transaction = metaCaller.transaction;
        }
      },
    });
    // transaction
    Object.defineProperty(context, 'transaction', {
      enumerable: false,
      get() {
        return context.dbMeta.transaction;
      },
    });
  }

  async moduleLoading(_module: IModule) {
    ExtendKnex(this.app);
  }
  async moduleLoaded(_module: IModule) {}
  async configLoaded(_module: IModule, _config) {}
  async metaLoaded(_module: IModule, _meta) {}
}
