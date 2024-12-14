import { FunctionAsync } from 'vona';
import { Meta } from 'vona-module-a-meta';
import { BeanRedlockBase, IRedlockLockIsolateOptions, IRedlockLockOptions } from 'vona-module-a-redlock';

export interface MetaRedlock {
  lock<RESULT>(
    resource: 'authProvider.register',
    fn: FunctionAsync<RESULT>,
    options?: IRedlockLockOptions,
  ): Promise<RESULT>;
  lockIsolate<RESULT>(
    resource: 'authProvider.register',
    fn: FunctionAsync<RESULT>,
    options?: IRedlockLockIsolateOptions,
  ): Promise<RESULT>;
}

@Meta()
export class MetaRedlock extends BeanRedlockBase {}
