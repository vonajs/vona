import { Bean } from '@cabloy/core';
import { BeanDatabaseDialect } from './virtual.databaseDialect.js';

@Bean({ scene: 'database.dialect' })
export class DatabaseDialectMysql extends BeanDatabaseDialect {}
