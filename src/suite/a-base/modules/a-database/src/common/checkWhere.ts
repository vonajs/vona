const __whereOrPlaceholder = '__or__';
const __whereAndPlaceholder = '__and__';

export function checkWhere(where) {
  if (where === true || where === false) return where;
  if (where === undefined || where === null) {
    return true;
  }
  if (where.isRawInstance) {
    return where.isRawInstance;
  }
  // loop
  let whereExists: boolean = false;
  for (const key in where) {
    const value = where[key];
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
        whereExists = true;
      }
    } else if (Array.isArray(value) && value.length === 0) {
      // check array
      return false;
    } else {
      // otherwise
      whereExists = true;
    }
  }
  if (!whereExists) return true;
  return 'whereExists';
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
  let whereExists: boolean = false;
  for (const or of ors) {
    const _where = checkWhere(or);
    if (_where === false) {
      // ignore
    } else if (_where === true) {
      return true;
    } else {
      whereExists = true;
    }
  }
  if (!whereExists) return false;
  return 'whereExists';
}

function _formatOrAnd_and(ors) {
  if (ors === undefined || ors === null) return true;
  if (!Array.isArray(ors)) ors = [ors];
  let whereExists: boolean = false;
  for (const or of ors) {
    const _where = checkWhere(or);
    if (_where === true) {
      // ignore
    } else if (_where === false) {
      // deny
      return false;
    } else {
      whereExists = true;
    }
  }
  if (!whereExists) return true;
  return 'whereExists';
}
