export type TypeModelWhere<TRecord> = {
  [prop in Extract<keyof TRecord, 'string'>]: any;
};

// not use Extract<keyof TRecord, 'string'>
export type TypeModelColumns<TRecord> = (keyof TRecord) | Array<keyof TRecord>;
