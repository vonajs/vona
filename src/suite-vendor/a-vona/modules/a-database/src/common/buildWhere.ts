import type { Knex } from 'knex';

import { formatValue, isRaw } from './utils.js';

export function buildWhere(builder: Knex.QueryBuilder, wheres) {
  // raw
  if (isRaw(wheres)) {
    builder.whereRaw(wheres);
    return;
  }
  // loop
  for (const [key, value] of wheres) {
    // raw
    if (isRaw(value)) {
      builder.where(key, value);
      continue;
    }
    // check key: exists
    if (['EXISTS'].includes(key)) {
      builder.whereExists(value);
      continue;
    }
    // check key: exists
    if (['NOTEXISTS'].includes(key)) {
      builder.whereNotExists(value);
      continue;
    }
    // check key: or/and
    if (['OR', 'AND'].includes(key)) {
      _formatOrAnd(builder, value, key);
      continue;
    }
    // check value
    if (Array.isArray(value)) {
      builder.whereIn(key, value);
    } else if (value === null || value === undefined) {
      builder.whereNull(key);
    } else if (value && !(value instanceof Date) && typeof value === 'object') {
      _buildWhereObject(builder, value, key);
    } else {
      // others
      builder.where(key, value);
    }
  }
}

function _buildWhereObject(builder: Knex.QueryBuilder, value, key) {
  // op
  let op = value.op || '='; // default is =
  op = op.indexOf('like') > -1 ? 'like' : op;
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
  return op.replace(/[\\\.*#%'"`;, ]/g, '');
}
