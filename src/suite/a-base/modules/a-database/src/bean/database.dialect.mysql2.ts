import { Bean } from '@cabloy/core';
import { DatabaseDialectMysql } from './database.dialect.mysql.js';

@Bean({ scene: 'database.dialect' })
export class DatabaseDialectMysql2 extends DatabaseDialectMysql {}
