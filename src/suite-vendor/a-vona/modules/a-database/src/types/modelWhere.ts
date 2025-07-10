import type { Knex } from 'knex';
import type { TypeRecordValues } from 'vona';

export const Op = {
  skip: '_skip_',
  and: '_and_',
  or: '_or_',
  not: '_not_',
  exists: '_exists_',
  notExists: '_notExists_',
  eq: '_eq_',
} as const;

export type TypeOpsJoint = TypeRecordValues<Pick<typeof Op, 'and' | 'or' | 'not' | 'exists' | 'notExists'>>;
export type TypeOpsNormal = TypeRecordValues<Pick<typeof Op, 'eq'>>;
export type TypeOpsAll = TypeRecordValues<typeof Op>;

export type TypeModelColumnValue<Column> = Column | Column[] | Knex.Raw | '_skip_';

export type TypeModelWhere<TRecord, Columns extends {} | undefined = undefined> =
  Columns extends {} ? TypeModelWhereInner<Columns> | Knex.Raw : TypeModelWhereInner<TRecord> | Knex.Raw;

export type TypeModelWhereInner<TRecord> = {
  [prop in keyof TRecord]?: TypeModelColumnValue<TRecord[prop]> | TypeModelWhereFieldAll<TRecord, TRecord[prop]>;
} & {
  [key in TypeOpsJoint]?: TypeModelWhereInner<TRecord>
};

export type TypeModelWhereFieldAll<TRecord, Column> = {
  [key in TypeOpsJoint]?: TypeModelWhereFieldAll<TRecord, Column>
} & {
  [key in TypeOpsNormal]?: TypeModelColumnValue<Column>
};

export type TypeModelWhereFieldJoint<TRecord, Column> = {
  [key in TypeOpsJoint]?: TypeModelWhereFieldAll<TRecord, Column>
};

export type TypeModelColumn<TRecord> = keyof TRecord | '*';
export type TypeModelColumns<TRecord> = TypeModelColumn<TRecord> | Array<TypeModelColumn<TRecord>>;
