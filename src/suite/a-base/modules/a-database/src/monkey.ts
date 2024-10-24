import { BeanSimple, VonaContext, IMonkeySystem } from 'vona';
import { LocalDbMeta } from './local/local.dbMeta.js';

const DATABASEMETA = Symbol.for('Context#__databasemeta');

export class Monkey extends BeanSimple implements IMonkeySystem {
  createContext(context: VonaContext): void {
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
}
