import { FunctionAsync } from 'vona';
import { Meta } from 'vona-module-a-meta';
import { BeanRedlockBase, IRedlockLockIsolateOptions } from 'vona-module-a-redlock';

export interface MetaRedlock {
  // lock<RESULT>(resource: 'name', fn: FunctionAsync<RESULT>, options?: IRedlockLockOptions): Promise<RESULT>;
  lockIsolate<RESULT, KEY extends string>(
    resource: `cacheDbSet.${KEY}`,
    fn: FunctionAsync<RESULT>,
    options?: IRedlockLockIsolateOptions,
  ): Promise<RESULT>;
}

@Meta()
export class MetaRedlock extends BeanRedlockBase {}
