import { BeanBase, Virtual } from '@cabloy/core';
import knex from 'knex';

@Virtual()
export class VirtualDatabaseDialect<T = unknown> extends BeanBase {
  knex: knex.Knex;

  get scope() {
    return this.getScope() as T;
  }

  protected __init__(knex: knex.Knex) {
    this.knex = knex;
  }
}
