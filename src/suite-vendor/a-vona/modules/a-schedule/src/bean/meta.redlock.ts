import { FunctionAsync } from 'vona';
import { Meta } from 'vona-module-a-meta';
import { BeanRedlockBase, IRedlockLockOptions } from 'vona-module-a-redlock';

export interface MetaRedlock {
  lock<RESULT, KEY extends string>(
    resource: `schedule.${KEY}`,
    fn: FunctionAsync<RESULT>,
    options?: IRedlockLockOptions,
  ): Promise<RESULT>;
}

@Meta()
export class MetaRedlock extends BeanRedlockBase {}
