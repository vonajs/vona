import type { Knex } from 'knex';

import type { TypeModelColumnValue, TypeModelWhere, TypeModelWhereFieldAll, TypeOpsJoint, TypeOpsNormal } from '../types/modelWhere.ts';
import { isNil } from '@cabloy/utils';
import { Op, OpJointValues, OpNormalValues } from '../types/modelWhere.ts';
import { isRaw } from './utils.ts';

export function buildWhere<TRecord>(builder: Knex.QueryBuilder, wheres: TypeModelWhere<TRecord>) {
  _buildWhereInner(builder, wheres);
}

function _buildWhereInner<TRecord>(
  builder: Knex.QueryBuilder,
  wheres: TypeModelWhere<TRecord>,
  column?: keyof TRecord,
  opJoint?: TypeOpsJoint,
) {
  // skip
  if (wheres === Op.skip) {
    return;
  }
  // and
  if (opJoint === Op.and) {
    builder.andWhere(builder => {
      _buildWhereInner_inner(builder, wheres, column);
    });
    return;
  }
  // or
  if (opJoint === Op.or) {
    builder.orWhere(builder => {
      _buildWhereInner_inner(builder, wheres, column);
    });
    return;
  }
  // normal
  _buildWhereInner_inner(builder, wheres, column);
}

function _buildWhereInner_inner<TRecord>(
  builder: Knex.QueryBuilder,
  wheres: TypeModelWhere<TRecord>,
  column?: keyof TRecord,
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
      _buildWhereColumn(builder, key, value, Op.eq);
    } else if (OpNormalValues.includes(key as any)) {
      // op: normal
      if (column) {
        _buildWhereColumn(builder, column, value, key as any);
      } else {
        // not go here
      }
    } else {
      const op = _checkOpJoint(key as any);
      if (op) {
        // op: joint
        _buildWhereOpJoint(builder, column, value, op);
      } else {
        // ignored, not throw error
      }
    }
  }
}

function _buildWhereOpJoint<TRecord>(
  builder: Knex.QueryBuilder,
  column: keyof TRecord | undefined,
  wheres: TypeModelWhere<TRecord>,
  op: TypeOpsJoint,
) {
  // skip
  if (wheres === Op.skip) {
    return;
  }
  // and/or
  if (op === Op.and || op === Op.or) {
    builder.where(builder => {
      _buildWhereInner(builder, wheres, column, op);
    });
    return;
  }
  // not
  if (op === Op.not) {
    builder.whereNot(builder => {
      _buildWhereInner(builder, wheres, column);
    });
    return;
  }
  // exists
  if (op === Op.exists) {
    builder.whereExists(builder => {
      _buildWhereInner(builder, wheres, column);
    });
    return;
  }
  // notexists
  if (op === Op.notExists) {
    builder.whereNotExists(builder => {
      _buildWhereInner(builder, wheres, column);
    });
  }
}

function _buildWhereColumn<TRecord>(
  builder: Knex.QueryBuilder,
  column: keyof TRecord,
  value: TypeModelColumnValue<TRecord, TRecord[keyof TRecord]> | TypeModelWhereFieldAll<TRecord, TRecord[keyof TRecord]>,
  op: TypeOpsNormal,
) {
  // skip
  if (value === Op.skip) {
    return;
  }
  // raw
  if (isRaw(value)) {
    _buildWhereColumnOpNormal(builder, column, value, op);
    return;
  }
  // null/undefined
  if (isNil(value)) {
    builder.whereNull(column);
    return;
  }
  // array
  if (Array.isArray(value)) {
    // support empty array
    builder.whereIn(column, value as []);
    return;
  }
  // date
  if (value instanceof Date) {
    _buildWhereColumnOpNormal(builder, column, value, op);
    return;
  }
  // object
  if (typeof value === 'object') {
    builder.where(builder => {
      _buildWhereInner(builder, value as any, column);
    });
    return;
  }
  // column
  _buildWhereColumnOpNormal(builder, column, value, op);
}

function _buildWhereColumnOpNormal<TRecord>(
  builder: Knex.QueryBuilder,
  column: keyof TRecord,
  value: any,
  op: TypeOpsNormal,
) {
  if (op === '_eq_') {
    builder.where(column, '=', value);
  }
}

function _checkOpJoint(op: TypeOpsJoint) {
  for (const item of OpJointValues) {
    if (op.startsWith(item)) {
      return item;
    }
  }
  return undefined;
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

// function _buildWhereObject(builder: Knex.QueryBuilder, value, key) {
//   // op
//   let op = value.op || '='; // default is =
//   op = op.includes('like') ? 'like' : op;
//   // op: null/notNull
//   if (op === 'null') {
//     return builder.whereNull(key);
//   }
//   if (op === 'notNull') {
//     return builder.whereNotNull(key);
//   }
//   // value
//   const _value = formatValue(value);
//   // op: like
//   if (op === 'like') {
//     return builder.whereILike(key, _value);
//   }
//   // op: in
//   if (op === 'in') {
//     return builder.whereIn(key, _value);
//   }
//   // op: notIn
//   if (op === 'notIn') {
//     return builder.whereNotIn(key, _value);
//   }
//   // others
//   builder.where(key, _safeOp(op), _value);
// }

// function _formatOrAnd(builder: Knex.QueryBuilder, wheres, orAnd) {
//   // or
//   if (orAnd === 'OR') {
//     return _formatOrAnd_or(builder, wheres);
//   }
//   // and
//   return _formatOrAnd_and(builder, wheres);
// }

// function _formatOrAnd_or(builder: Knex.QueryBuilder, wheres) {
//   builder.where(builder => {
//     for (const where of wheres) {
//       builder.orWhere(builder => {
//         buildWhere(builder, where);
//       });
//     }
//   });
// }

// function _formatOrAnd_and(builder: Knex.QueryBuilder, wheres) {
//   builder.where(builder => {
//     for (const where of wheres) {
//       builder.andWhere(builder => {
//         buildWhere(builder, where);
//       });
//     }
//   });
// }

// function _safeOp(op) {
//   if (op === 'notIn') return 'not in';
//   return op.replace(/[\\.*#%'"`;, ]/g, '');
// }
