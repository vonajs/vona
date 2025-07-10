export type TypeModelWhere<TRecord> = {
  [prop in keyof TRecord]?: TRecord[prop] | Array<TRecord[prop]>;
};

export type TypeModelColumn<TRecord> = keyof TRecord | '*';
export type TypeModelColumns<TRecord> = TypeModelColumn<TRecord> | Array<TypeModelColumn<TRecord>>;
