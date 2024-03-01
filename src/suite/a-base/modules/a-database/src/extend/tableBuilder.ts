import knex from 'knex';
import { CabloyApplication } from '@cabloy/core';

export interface IBasicFieldsOptions {
  id?: boolean;
  timestamps?: boolean;
  deleted?: boolean;
  iid?: boolean;
}

export function ExtendTableBuilder(_app: CabloyApplication) {
  knex.TableBuilder.extend('basicFields', function (options?: IBasicFieldsOptions) {
    options = options || ({} as IBasicFieldsOptions);
    if (options.id !== false) this.increments();
    if (options.timestamps !== false) this.timestamps(true, true, true);
    if (options.deleted !== false) this.integer('deleted').defaultTo(0);
    if (options.iid !== false) this.integer('iid').defaultTo(0);
    return this;
  });
  knex.TableBuilder.extend('atomId', function () {
    this.integer('atomId').defaultTo(0);
    return this;
  });
  knex.TableBuilder.extend('itemId', function () {
    this.integer('itemId').defaultTo(0);
    return this;
  });
}

declare module 'knex' {
  namespace Knex {
    interface TableBuilder {
      basicFields(options?: IBasicFieldsOptions): Knex.TableBuilder;
      atomId(): Knex.TableBuilder;
      itemId(): Knex.TableBuilder;
    }
  }
}
