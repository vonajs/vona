import { FunctionAsync, Meta } from 'vona';
import { BeanRedlockBase, IRedlockLockIsolateOptions } from 'vona-module-a-redlock';

export interface MetaRedlock {
  // lock<RESULT>(resource: 'name', fn: FunctionAsync<RESULT>, options?: IRedlockLockOptions): Promise<RESULT>;
  // lockIsolate<RESULT>(
  //   resource: 'name',
  //   fn: FunctionAsync<RESULT>,
  //   options?: IRedlockLockIsolateOptions,
  // ): Promise<RESULT>;
  lockIsolate<RESULT, KEY extends string>(
    resource: `flowTask.nodeDoneCheck.${KEY}`,
    fn: FunctionAsync<RESULT>,
    options?: IRedlockLockIsolateOptions,
  ): Promise<RESULT>;
}

@Meta()
export class MetaRedlock extends BeanRedlockBase {}
