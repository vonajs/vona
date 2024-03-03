import { isRaw } from './utils.js';

const __whereOrPlaceholder = '__or__';
const __whereAndPlaceholder = '__and__';

export function checkWhere(where) {
  if (where === true || where === false) return where;
  if (where === undefined || where === null) {
    return true;
  }
  if (isRaw(where)) {
    return where;
  }
  // loop
  const wheres: Array<[key: string, value: any]> = [];
  for (const key in where) {
    const value = where[key];
    // raw
    if (isRaw(value)) {
      wheres.push([key, value]);
      continue;
    }
    // check key or/and
    let keyOrAnd;
    if (key.indexOf(__whereOrPlaceholder) > -1) {
      keyOrAnd = 'OR';
    } else if (key.indexOf(__whereAndPlaceholder) > -1) {
      keyOrAnd = 'AND';
    }
    if (keyOrAnd) {
      const _where = _formatOrAnd(value, keyOrAnd);
      if (_where === true) {
        // ignore
      } else if (_where === false) {
        // deny
        return false;
      } else {
        wheres.push([keyOrAnd, _where]);
      }
    } else if (Array.isArray(value) && value.length === 0) {
      // check array
      return false;
    } else {
      // otherwise
      wheres.push([key, value]);
    }
  }
  if (wheres.length === 0) return true;
  return wheres;
}

function _formatOrAnd(ors, orAnd) {
  // or
  if (orAnd === 'OR') {
    return _formatOrAnd_or(ors);
  }
  // and
  return _formatOrAnd_and(ors);
}

function _formatOrAnd_or(ors) {
  if (ors === undefined || ors === null) return false;
  if (!Array.isArray(ors)) ors = [ors];
  const wheres: Array<any> = [];
  for (const or of ors) {
    const _where = checkWhere(or);
    if (_where === false) {
      // ignore
    } else if (_where === true) {
      return true;
    } else {
      wheres.push(_where);
    }
  }
  if (wheres.length === 0) return false;
  return wheres;
}

function _formatOrAnd_and(ors) {
  if (ors === undefined || ors === null) return true;
  if (!Array.isArray(ors)) ors = [ors];
  const wheres: Array<any> = [];
  for (const or of ors) {
    const _where = checkWhere(or);
    if (_where === true) {
      // ignore
    } else if (_where === false) {
      // deny
      return false;
    } else {
      wheres.push(_where);
    }
  }
  if (wheres.length === 0) return true;
  return wheres;
}
