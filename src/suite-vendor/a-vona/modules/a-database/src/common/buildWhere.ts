import type { Knex } from 'knex';

import type { TypeModelColumnValue, TypeModelWhere, TypeModelWhereFieldAll, TypeOpsNormal } from '../types/modelWhere.ts';
import { isNil } from '@cabloy/utils';
import { Op, OpJointValues, OpNormalValues, OpValues } from '../types/modelWhere.ts';
import { formatValue, isRaw } from './utils.ts';

export function buildWhere<TRecord>(builder: Knex.QueryBuilder, wheres: TypeModelWhere<TRecord>) {
  _buildWhereInner(builder, wheres);
}

function _buildWhereInner<TRecord, Column extends keyof TRecord>(
  builder: Knex.QueryBuilder,
  wheres: TypeModelWhere<TRecord>,
  column?: Column,
) {
  // skip
  if (wheres === Op.skip) {
    return;
  }
  // raw
  if (isRaw(wheres)) {
    builder.whereRaw(wheres as Knex.Raw);
    return;
  }
  // loop
  for (const key in wheres) {
    const value = wheres[key];
    if (key[0] !== '_') {
      // columns
      _buildWhereColumn(builder, key as never, value, Op.eq);
    } else if (OpNormalValues.includes(key as any)) {
      // op: normal
      if (column) {
        _buildWhereColumn(builder, column as never, value, key as any);
      } else {
        // not go here
      }
    } else if (OpJointValues.includes(key as any)) {
      // op: joint
    } else {
      // ignored, not throw error
    }
  }
}

function _buildWhereColumn<TRecord, Column extends keyof TRecord>(
  builder: Knex.QueryBuilder,
  column: Column,
  value: TypeModelColumnValue<TRecord, TRecord[Column]> | TypeModelWhereFieldAll<TRecord, TRecord[Column]>,
  op: TypeOpsNormal,
) {
  // skip
  if (value === Op.skip) {
    return;
  }
  // raw
  if (isRaw(value)) {
    builder.where(column, '=', value as Knex.Raw);
    return;
  }
  // null/undefined
  if (isNil(value)) {
    builder.whereNull(column);
    return;
  }
  // array
  if (Array.isArray(value)) {
    builder.whereIn(column, value as []);
    return;
  }
  // date
  if (value instanceof Date) {
    builder.where(column, '=', value);
    return;
  }
  // object
  if (typeof value === 'object') {
    builder.where(builder => {
      _buildWhereInner(builder, value as any, column as never);
    });
    return;
  }
  // column
  builder.where(column, '=', value as any);
}

function _buildWhereColumnOp<TRecord, Column extends keyof TRecord>(
  builder: Knex.QueryBuilder,
  column: Column,
  value: any,
  op: TypeOpsNormal,
) {
  if (op === '_eq_') {
    builder.where(column, '=', value);
  }
}

// export function buildWhere(builder: Knex.QueryBuilder, wheres) {
//   // raw
//   if (isRaw(wheres)) {
//     builder.whereRaw(wheres);
//     return;
//   }
//   // loop
//   for (const [key, value] of wheres) {
//     // raw
//     if (isRaw(value)) {
//       builder.where(key, value);
//       continue;
//     }
//     // check key: exists
//     if (['EXISTS'].includes(key)) {
//       builder.whereExists(value);
//       continue;
//     }
//     // check key: exists
//     if (['NOTEXISTS'].includes(key)) {
//       builder.whereNotExists(value);
//       continue;
//     }
//     // check key: or/and
//     if (['OR', 'AND'].includes(key)) {
//       _formatOrAnd(builder, value, key);
//       continue;
//     }
//     // check value
//     if (Array.isArray(value)) {
//       builder.whereIn(key, value);
//     } else if (value === null || value === undefined) {
//       builder.whereNull(key);
//     } else if (value && !(value instanceof Date) && typeof value === 'object') {
//       _buildWhereObject(builder, value, key);
//     } else {
//       // others
//       builder.where(key, value);
//     }
//   }
// }

function _buildWhereObject(builder: Knex.QueryBuilder, value, key) {
  // op
  let op = value.op || '='; // default is =
  op = op.includes('like') ? 'like' : op;
  // op: null/notNull
  if (op === 'null') {
    return builder.whereNull(key);
  }
  if (op === 'notNull') {
    return builder.whereNotNull(key);
  }
  // value
  const _value = formatValue(value);
  // op: like
  if (op === 'like') {
    return builder.whereILike(key, _value);
  }
  // op: in
  if (op === 'in') {
    return builder.whereIn(key, _value);
  }
  // op: notIn
  if (op === 'notIn') {
    return builder.whereNotIn(key, _value);
  }
  // others
  builder.where(key, _safeOp(op), _value);
}

function _formatOrAnd(builder: Knex.QueryBuilder, wheres, orAnd) {
  // or
  if (orAnd === 'OR') {
    return _formatOrAnd_or(builder, wheres);
  }
  // and
  return _formatOrAnd_and(builder, wheres);
}

function _formatOrAnd_or(builder: Knex.QueryBuilder, wheres) {
  builder.where(builder => {
    for (const where of wheres) {
      builder.orWhere(builder => {
        buildWhere(builder, where);
      });
    }
  });
}

function _formatOrAnd_and(builder: Knex.QueryBuilder, wheres) {
  builder.where(builder => {
    for (const where of wheres) {
      builder.andWhere(builder => {
        buildWhere(builder, where);
      });
    }
  });
}

function _safeOp(op) {
  if (op === 'notIn') return 'not in';
  return op.replace(/[\\.*#%'"`;, ]/g, '');
}
