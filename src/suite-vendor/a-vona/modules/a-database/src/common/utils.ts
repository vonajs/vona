export function isRaw(raw) {
  return typeof raw?.constructor === 'function' && raw?.constructor?.name === 'Raw';
}

export function getTableOrTableAlias(table: string) {
  const _table = table.toString();
  return _table.includes(' as ') ? _table.split(' as ')[1].trim() : _table;
}

export function getTargetColumnName(column: string) {
  if (column.includes(' as ')) return column.split(' as ')[1].trim();
  if (column.includes('.')) return column.split('.')[1].trim();
  return column;
}

// export function formatValue(value) {
//   if (typeof value !== 'object' || value instanceof Date) return value;
//   // date
//   if (value.type === 'Date') return moment(value.val).toDate();
//   // like
//   if (value.op === 'like') return `%${value.val}%`;
//   if (value.op === 'likeLeft') return `%${value.val}`;
//   if (value.op === 'likeRight') return `${value.val}%`;
//   if (value.op === 'likeStrict') return `${value.val}`;
//   // in
//   if (['in', 'notIn'].includes(value.op)) {
//     return formatValueArray(value);
//   }
//   // others
//   return value.val;
// }

// export function formatValueArray(value) {
//   if (!value.val) return null;
//   const arr = typeof value.val === 'string' ? value.val.split(',') : value.val;
//   if (arr.length === 0) return null;
//   return arr;
// }
