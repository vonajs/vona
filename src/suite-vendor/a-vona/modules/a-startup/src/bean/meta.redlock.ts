import type { FunctionAsync } from 'vona';
import type { IRedlockLockIsolateOptions } from 'vona-module-a-redlock';
import { Meta } from 'vona-module-a-meta';
import { BeanRedlockBase } from 'vona-module-a-redlock';

export interface MetaRedlock {
  lockIsolate: <RESULT, KEY extends string>(
    resource: `startup.${KEY}`,
    fn: FunctionAsync<RESULT>,
    options?: IRedlockLockIsolateOptions,
  ) => Promise<RESULT>;
}

@Meta()
export class MetaRedlock extends BeanRedlockBase {}
