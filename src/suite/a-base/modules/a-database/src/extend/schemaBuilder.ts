import knex, { Knex } from 'knex';
import { IFetchDatabasesResultItem, VirtualDatabaseDialect } from '../bean/virtual.databaseDialect.js';
import { CabloyApplication, Cast } from '@cabloy/core';
import { __ThisModule__ } from '../resource/this.js';

export function ExtendSchemaBuilder(app: CabloyApplication) {
  function getDialect(schemaBuilder: Knex.SchemaBuilder): VirtualDatabaseDialect {
    const client = Cast<Knex.Client>(Cast(schemaBuilder).client).config.client;
    const beanFullName = `${__ThisModule__}.database.dialect.${client}`;
    const dialect = app.bean._newBean(beanFullName, schemaBuilder) as VirtualDatabaseDialect;
    if (!dialect) {
      throw new Error(`database dialect not found: ${client}`);
    }
    return dialect;
  }

  ['fetchDatabases'].forEach(function (method) {
    knex.SchemaBuilder.extend(method, async function (...args) {
      const dialect = getDialect(this);
      return await dialect[method](...args);
    });
  });
}

declare module 'knex' {
  namespace Knex {
    interface SchemaBuilder {
      fetchDatabases(_databasePrefix: string): Promise<IFetchDatabasesResultItem[]>;
    }
  }
}
