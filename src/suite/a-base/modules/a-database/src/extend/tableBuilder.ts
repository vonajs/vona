import knex from 'knex';
import { CabloyApplication } from '@cabloy/core';

export function ExtendTableBuilder(_app: CabloyApplication) {
  knex.TableBuilder.extend('basicFields', function () {
    this.increments();
    this.timestamps(true, true, true);
    this.integer('deleted').defaultTo(0);
    this.integer('iid').defaultTo(0);
    return this;
  });
}

declare module 'knex' {
  namespace Knex {
    interface TableBuilder {
      basicFields(): Knex.TableBuilder;
    }
  }
}
