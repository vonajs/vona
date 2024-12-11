import { FunctionAsync, Meta } from 'vona';
import { BeanRedlockBase, IRedlockLockIsolateOptions } from 'vona-module-a-redlock';

export interface MetaRedlock {
  lockIsolate<RESULT>(
    resource: string,
    fn: FunctionAsync<RESULT>,
    options?: IRedlockLockIsolateOptions,
  ): Promise<RESULT>;
}

@Meta()
export class MetaRedlock extends BeanRedlockBase {}
