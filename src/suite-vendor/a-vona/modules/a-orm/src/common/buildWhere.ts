import type { Knex } from 'knex';
import type { TypeModelColumnValue, TypeModelWhere, TypeModelWhereFieldAll, TypeOpsJoint, TypeOpsNormal } from '../types/modelWhere.ts';
import { isNil } from '@cabloy/utils';
import { cast } from 'vona';
import { Op, OpAggrs, OpJointValues, OpNormalValues } from '../types/modelWhere.ts';
import { isRaw } from './utils.ts';

export function buildWhere<TRecord>(knex: Knex, builder: Knex.QueryBuilder, wheres: TypeModelWhere<TRecord>, having: boolean = false) {
  _buildWhereInner(having, knex, builder, wheres);
}

function _buildWhereInner<TRecord>(
  having: boolean,
  knex: Knex,
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
    builder[having ? 'havingRaw' : 'whereRaw'](wheres as Knex.Raw);
    return;
  }
  // loop
  for (const key in wheres) {
    const value = wheres[key];
    if (key[0] !== '_') {
      // columns
      _buildWhereColumn(having, knex, builder, key, value);
    } else if (OpNormalValues.includes(key as any)) {
      // op: normal
      if (column) {
        _buildWhereColumn(having, knex, builder, column, value, key as any);
      } else {
        // not go here
      }
    } else {
      const op = _checkOpJoint(key as any);
      if (op) {
        // op: joint
        _buildWhereOpJoint(having, knex, builder, column, value, op);
      } else {
        // ignored, not throw error
      }
    }
  }
}

function _buildWhereOpJoint<TRecord>(
  having: boolean,
  knex: Knex,
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
  if (op === Op.and) {
    builder[having ? 'having' : 'where'](builder => {
      for (const key in wheres) {
        builder[having ? 'andHaving' : 'andWhere'](builder => {
          _buildWhereInner(having, knex, builder, { [key]: wheres[key] } as any, column);
        });
      }
    });
    return;
  }
  // or
  if (op === Op.or) {
    builder[having ? 'having' : 'where'](builder => {
      for (const key in wheres) {
        builder[having ? 'orHaving' : 'orWhere'](builder => {
          _buildWhereInner(having, knex, builder, { [key]: wheres[key] } as any, column);
        });
      }
    });
    return;
  }
  // not
  if (op === Op.not) {
    builder[having ? 'havingNot' : 'whereNot'](builder => {
      _buildWhereInner(having, knex, builder, wheres, column);
    });
    return;
  }
  // exists
  if (op === Op.exists) {
    builder[having ? 'havingExists' : 'whereExists'](wheres as any);
    return;
  }
  // notexists
  if (op === Op.notExists) {
    builder[having ? 'havingNotExists' : 'whereNotExists'](wheres as any);
  }
}

function _buildWhereColumn<TRecord>(
  having: boolean,
  knex: Knex,
  builder: Knex.QueryBuilder,
  column: keyof TRecord,
  value: TypeModelColumnValue<TRecord, TRecord[keyof TRecord]> | TypeModelWhereFieldAll<TRecord, TRecord[keyof TRecord]>,
  op?: TypeOpsNormal,
) {
  // skip
  if (value === Op.skip) {
    return;
  }
  // raw
  if (isRaw(value)) {
    _buildWhereColumnOpNormal(having, knex, builder, column, value, op ?? Op.eq);
    return;
  }
  // null/undefined
  if (isNil(value)) {
    _buildWhereColumnOpNormal(having, knex, builder, column, value, op ?? Op.is);
    return;
  }
  // array
  if (Array.isArray(value)) {
    _buildWhereColumnOpNormal(having, knex, builder, column, value, op ?? Op.in);
    return;
  }
  // date
  if (value instanceof Date) {
    _buildWhereColumnOpNormal(having, knex, builder, column, value, op ?? Op.eq);
    return;
  }
  // object
  if (typeof value === 'object') {
    builder[having ? 'having' : 'where'](builder => {
      _buildWhereInner(having, knex, builder, value as any, column);
    });
    return;
  }
  // column
  _buildWhereColumnOpNormal(having, knex, builder, column, value, op ?? Op.eq);
}

function _buildWhereColumnOpNormal<TRecord>(
  having: boolean,
  knex: Knex,
  builder: Knex.QueryBuilder,
  column: keyof TRecord | string,
  value: any,
  op: TypeOpsNormal,
) {
  column = _checkHavingColumn(having, column) as string;
  if (op === Op.eq) {
    builder[having ? 'having' : 'where'](column, '=', value);
  } else if (op === Op.notEq) {
    builder[having ? 'having' : 'where'](column, '<>', value);
  } else if (op === Op.gt) {
    builder[having ? 'having' : 'where'](column, '>', value);
  } else if (op === Op.gte) {
    builder[having ? 'having' : 'where'](column, '>=', value);
  } else if (op === Op.lt) {
    builder[having ? 'having' : 'where'](column, '<', value);
  } else if (op === Op.lte) {
    builder[having ? 'having' : 'where'](column, '<=', value);
  } else if (op === Op.in) {
    builder[having ? 'havingIn' : 'whereIn'](column, value);
  } else if (op === Op.notIn) {
    builder[having ? 'havingNotIn' : 'whereNotIn'](column, value);
  } else if (op === Op.is) {
    builder[having ? 'havingNull' : 'whereNull'](column);
  } else if (op === Op.isNot) {
    builder[having ? 'havingNotNull' : 'whereNotNull'](column);
  } else if (op === Op.between) {
    builder[having ? 'havingBetween' : 'whereBetween'](column, value);
  } else if (op === Op.notBetween) {
    builder[having ? 'havingNotBetween' : 'whereNotBetween'](column, value);
  } else if (op === Op.startsWith) {
    builder[having ? 'havingLike' : 'whereLike'](column, `${value}%` as any);
  } else if (op === Op.endsWith) {
    builder[having ? 'havingLike' : 'whereLike'](column, `%${value}` as any);
  } else if (op === Op.includes) {
    builder[having ? 'havingLike' : 'whereLike'](column, `%${value}%` as any);
  } else if (op === Op.startsWithI) {
    builder[having ? 'havingILike' : 'whereILike'](column, `${value}%` as any);
  } else if (op === Op.endsWithI) {
    builder[having ? 'havingILike' : 'whereILike'](column, `%${value}` as any);
  } else if (op === Op.includesI) {
    builder[having ? 'havingILike' : 'whereILike'](column, `%${value}%` as any);
  } else if (op === Op.ref) {
    builder[having ? 'having' : 'where'](column, '=', knex.ref(value));
  }
}

function _checkHavingColumn<TRecord>(having: boolean, column: keyof TRecord | string) {
  if (!having) return column;
  let [aggr, name] = cast<string>(column).split('_');
  if (!OpAggrs.includes(aggr) || !name) return column;
  if (aggr === 'count' && name === 'all') name = '*';
  return `${_safeOp(aggr)}(${_safeColumn(name)})`;
}

function _checkOpJoint(op: TypeOpsJoint) {
  for (const item of OpJointValues) {
    if (op.startsWith(item)) {
      return item;
    }
  }
  return undefined;
}

function _safeOp(op) {
  return op.replace(/[\\.*#%'"`;,() ]/g, '');
}

function _safeColumn(column) {
  return column.replace(/[\\.#%'"`;,() ]/g, '');
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
