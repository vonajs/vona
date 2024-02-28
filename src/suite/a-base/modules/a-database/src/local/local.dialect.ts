import { BeanBase, Virtual } from '@cabloy/core';
import knex from 'knex';

@Virtual({ scene: 'local' })
export class LocalDialect extends BeanBase {
  knex: knex.Knex;

  protected __init__(knex: knex.Knex) {
    this.knex = knex;
  }
}
