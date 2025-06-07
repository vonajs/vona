export const TransactionIsolationLevels = [undefined, 'read uncommitted', 'read committed', 'repeatable read', 'serializable', 'snapshot'];

export enum EnumTransactionIsolationLevels {
  DEFAULT = 0,
  READ_UNCOMMITTED = 1,
  READ_COMMITTED = 2,
  REPEATABLE_READ = 3,
  SERIALIZABLE = 4,
  SNAPSHOT = 5,
}

export enum EnumTransactionPropagation {
  REQUIRED = 0,
  SUPPORTS = 1,
  MANDATORY = 2,
  REQUIRES_NEW = 3,
  NOT_SUPPORTED = 4,
  NEVER = 5,
}

// export type TransactionPropagation=''
export interface ITransactionOptions {
  isolationLevel?: EnumTransactionIsolationLevels;
  readOnly?: boolean;
  propagation?: EnumTransactionPropagation;
}

export interface ITransactionConsistencyCommitOptions {
  ctxPrefer?: boolean;
}
