import type knex from 'knex';
import type { VonaApplication } from 'vona';
import type { IServiceRecord } from 'vona-module-a-web';

export function config(_app: VonaApplication) {
  return {
    tableIdentity: {
      user(this: knex.Knex.TableBuilder, _columnName: string) {
        return this.increments();
      },
      userRef(this: knex.Knex.TableBuilder, columnName: string) {
        return this.int0(columnName);
      },
      auth(this: knex.Knex.TableBuilder, _columnName: string) {
        return this.increments();
      },
      authRef(this: knex.Knex.TableBuilder, columnName: string) {
        return this.int0(columnName);
      },
    },
    passportAdapter: 'home-user:passportAdapter' as keyof IServiceRecord,
  };
}
