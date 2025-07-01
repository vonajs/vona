// not use Extract<keyof TRecord, 'string'>
export type TypeModelWhere<TRecord> = {
  [prop in keyof TRecord]?: TRecord[prop] | Array<TRecord[prop]>;
};

// not use Extract<keyof TRecord, 'string'>
export type TypeModelColumn<TRecord> = keyof TRecord | '*';
export type TypeModelColumns<TRecord> = TypeModelColumn<TRecord> | Array<TypeModelColumn<TRecord>>;
