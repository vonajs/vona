export type TransactionIsolationLevels =
  | 'read uncommitted'
  | 'read committed'
  | 'snapshot'
  | 'repeatable read'
  | 'serializable';

export interface ITransactionOptions {
  isolationLevel?: TransactionIsolationLevels;
  readOnly?: boolean;
}
