// not use Extract<keyof TRecord, 'string'>
export type TypeModelWhere<TRecord> = {
  [prop in keyof TRecord]?: TRecord[prop];
};

// not use Extract<keyof TRecord, 'string'>
export type TypeModelColumns<TRecord> = (keyof TRecord) | Array<keyof TRecord>;
