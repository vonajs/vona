export const TransactionIsolationLevels = [undefined, 'read uncommitted', 'read committed', 'repeatable read', 'serializable', 'snapshot'];

export enum EnumTransactionIsolationLevels {
  DEFAULT = 0,
  READ_UNCOMMITTED = 1,
  READ_COMMITTED = 2,
  REPEATABLE_READ = 3,
  SERIALIZABLE = 4,
  snapshot = 5,
}

// export type TransactionPropagation=''
export interface ITransactionOptions {
  isolationLevel?: EnumTransactionIsolationLevels;
  readOnly?: boolean;
  // propagation?: TransactionPropagation;
}
