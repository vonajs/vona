export type TypeModelWhere<TRecord> = {
  [prop in Extract<keyof TRecord, 'string'>]: any;
};

export type TypeModelColumns<TRecord> = (Extract<keyof TRecord, 'string'>) | Array<Extract<keyof TRecord, 'string'>>;
