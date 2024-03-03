import { Knex } from 'knex';
import moment from 'moment';
import { isRaw } from './utils.js';

export function buildWhere(builder: Knex.QueryBuilder, wheres) {
  // raw
  if (isRaw(wheres)) {
    builder.whereRaw(wheres);
  }
  // loop
  for (const [key, value] of wheres) {
    // raw
    if (isRaw(value)) {
      builder.where(key, value);
      continue;
    }
    // check key or/and
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
  const _value = _formatValue(value);
  // op: like
  if (op === 'like') {
    return builder.whereILike(key, _value);
  }
  // op: in
  if (op === 'in') {
    if (_value === null) {
      builder.whereRaw('1 = 0');
    } else {
      builder.whereIn(key, _value);
    }
    return;
  }
  // op: notIn
  if (op === 'notIn') {
    if (_value === null) {
      builder.whereRaw('1 = 1');
    } else {
      builder.whereNotIn(key, _value);
    }
    return;
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

function _formatValue(value) {
  if (typeof value !== 'object' || value instanceof Date) return value;
  // date
  if (value.type === 'Date') return moment(value.val).toDate();
  // like
  if (value.op === 'like') return `%${value.val}%`;
  if (value.op === 'likeLeft') return `%${value.val}`;
  if (value.op === 'likeRight') return `${value.val}%`;
  // in
  if (['in', 'notIn'].includes(value.op)) {
    if (!value.val) return null;
    const arr = typeof value.val === 'string' ? value.val.split(',') : value.val;
    if (arr.length === 0) return null;
    return arr;
  }
  // others
  return value.val;
}

function _safeOp(op) {
  if (op === 'notIn') return 'not in';
  return op.replace(/[\\\.*#%'"`;, ]/g, '');
}
