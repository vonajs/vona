import type { Knex } from 'knex';
import type { TypeRecordValues } from 'vona';
import type { EntityPost } from 'vona-module-test-vona';

export const Op = {
  and: '_and_',
  or: '_or_',
  not: '_not_',
  exists: '_exists_',
  notExists: '_notExists_',
  eq: '_eq_',
} as const;

export type TypeOpsTop = TypeRecordValues<Pick<typeof Op, 'and' | 'or' | 'not' | 'exists' | 'notExists'>>;
export type TypeOpsNormal = TypeRecordValues<Pick<typeof Op, 'eq'>>;
export type TypeOpsAll = TypeRecordValues<typeof Op>;

export type TypeModelColumnValue<Column> = Column | Column[] | Knex.Raw;

export type TypeModelWhere<TRecord> = {
  [prop in keyof TRecord]?: TRecord[prop] | Array<TRecord[prop]> | TypeModelWhereFieldAll<TRecord, TRecord[prop]>;
};

export type TypeModelWhereFieldAll<TRecord, Column> = {
  [key in TypeOpsTop]?: TypeModelWhereFieldAll<TRecord, Column>
} & {
  [key in TypeOpsNormal]?: TypeModelColumnValue<Column>
};

export type TypeModelWhereFieldTop<TRecord, Column> = {
  [key in TypeOpsTop]?: TypeModelWhereFieldAll<TRecord, Column>
};

export type TypeModelColumn<TRecord> = keyof TRecord | '*';
export type TypeModelColumns<TRecord> = TypeModelColumn<TRecord> | Array<TypeModelColumn<TRecord>>;

const a: TypeModelWhere<EntityPost> = { iid: { _eq_: 1 } };
