import { BeanBase, Local } from '@cabloy/core';
import knex from 'knex';
import { promisify } from 'node:util';
import { ScopeModule } from '../resource/this.js';

@Local({ containerScope: 'app' })
export class LocalClient extends BeanBase<ScopeModule> {
  knex: knex.Knex;

  get configDatabase() {
    return this.app.config.database;
  }

  protected __init__(clientName?: string) {
    // config
    const clientConfig = this.getClientConfig(clientName);
    const debug = this.app.bean.debug.get('db');
    debug('clientName: %s, clientConfig: %j', clientName, clientConfig);
    // client
    this.knex = knex(clientConfig);
  }

  get(clientName?: string) {
    const client = this.app.bean._getBeanSelector(LocalClient, clientName);
    return client.knex;
  }

  getClientConfig(clientName?: string, original: boolean = false): knex.Knex.Config {
    // clientName
    if (!clientName) {
      clientName = this.configDatabase.defaultClient;
    }
    // clientConfig
    let clientConfig = this.configDatabase.clients[clientName];
    if (original) return clientConfig;
    // combine
    clientConfig = this.bean.util.extend({}, this.configDatabase.base, clientConfig);
    // patch afterCreate
    const afterCreateOld = clientConfig.pool!.afterCreate;
    clientConfig.pool!.afterCreate = async (conn, done) => {
      try {
        if (afterCreateOld) {
          await afterCreateOld(conn, clientConfig);
        } else {
          await this.afterCreate(conn, clientConfig);
        }
        done(null);
      } catch (err) {
        done(err);
      }
    };
    // ready
    return clientConfig;
  }

  setClientConfig(clientName: string, clientConfig: knex.Knex.Config) {
    // clientName
    if (!clientName) {
      clientName = this.configDatabase.defaultClient;
    }
    this.configDatabase.clients[clientName] = clientConfig;
  }

  async afterCreate(conn, clientConfig: knex.Knex.Config) {
    if (typeof clientConfig.client === 'string' && ['mysql', 'mysql2'].includes(clientConfig.client)) {
      await this._executeQuery(conn, 'SET SESSION explicit_defaults_for_timestamp=ON');
    }
  }

  private async _executeQuery(conn, sql) {
    const queryAsync = promisify(cb => conn.query(sql, cb));
    return await queryAsync();
  }
}
