import { Bean } from '@cabloy/core';
import { VirtualDatabaseDialect } from './virtual.databaseDialect.js';

@Bean({ scene: 'database.dialect' })
export class DatabaseDialectMysql extends VirtualDatabaseDialect {}
