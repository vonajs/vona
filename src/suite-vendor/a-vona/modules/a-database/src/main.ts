import type { IModuleMain, VonaContext } from 'vona';
import { BeanSimple } from 'vona';
import { ExtendKnex } from './extend/index.ts';
import { ServiceDbMeta } from './service/dbMeta.ts';

const DATABASEMETA = Symbol('Context#__databasemeta');

export class Main extends BeanSimple implements IModuleMain {
  async moduleLoading() {
    ExtendKnex(this.app);
  }

  async moduleLoaded() {
    // db
    Object.defineProperty(this.app.context, 'db', {
      enumerable: false,
      get(this: VonaContext) {
        return this.dbMeta.transaction.inTransaction
          ? this.dbMeta.transaction.connection
          : this.app.bean.database.getDefault();
      },
    });
    // dbMeta
    Object.defineProperty(this.app.context, 'dbMeta', {
      enumerable: false,
      get(this: VonaContext) {
        if (!this[DATABASEMETA]) {
          this[DATABASEMETA] = this.bean._newBean(ServiceDbMeta);
        }
        return this[DATABASEMETA];
      },
      set(metaCaller: ServiceDbMeta) {
        // transaction
        if (metaCaller.transaction.inTransaction) {
          this.dbMeta.master = false; // false only on metaCaller.transaction=true
          this.dbMeta.transaction = metaCaller.transaction;
        }
      },
    });
    // transaction
    Object.defineProperty(this.app.context, 'transaction', {
      enumerable: false,
      get(this: VonaContext) {
        return this.dbMeta.transaction;
      },
    });
  }

  async configLoaded(_config) {}
}
