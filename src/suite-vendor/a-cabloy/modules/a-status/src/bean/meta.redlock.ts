import type { FunctionAsync } from 'vona';
import { Meta } from 'vona-module-a-meta';
import type { IRedlockLockIsolateOptions } from 'vona-module-a-redlock';
import { BeanRedlockBase } from 'vona-module-a-redlock';

export interface MetaRedlock {
  // lock<RESULT>(resource: 'name', fn: FunctionAsync<RESULT>, options?: IRedlockLockOptions): Promise<RESULT>;
  // lockIsolate<RESULT>(
  //   resource: 'name',
  //   fn: FunctionAsync<RESULT>,
  //   options?: IRedlockLockIsolateOptions,
  // ): Promise<RESULT>;
  lockIsolate<RESULT, KEY extends string>(
    resource: `statusSet.${KEY}`,
    fn: FunctionAsync<RESULT>,
    options?: IRedlockLockIsolateOptions,
  ): Promise<RESULT>;
}

@Meta()
export class MetaRedlock extends BeanRedlockBase {}
