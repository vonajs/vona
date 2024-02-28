import { Bean } from '@cabloy/core';
import knex from 'knex';
import { LocalDialect } from './local.dialect.js';

@Bean({ scene: 'database.dialect' })
export class LocalDialectMysql extends LocalDialect {
  knex: knex.Knex;

  protected __init__(knex: knex.Knex) {
    this.knex = knex;
  }
}
