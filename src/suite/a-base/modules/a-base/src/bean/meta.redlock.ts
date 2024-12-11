import { FunctionAsync, Meta } from 'vona';
import { BeanRedlockBase, IRedlockLockIsolateOptions } from 'vona-module-a-redlock';

export interface MetaRedlock {
  // lock<RESULT>(
  //   resource: 'atomClass.register',
  //   fn: FunctionAsync<RESULT>,
  //   options?: IRedlockLockOptions,
  // ): Promise<RESULT>;
  lockIsolate<RESULT>(
    resource: 'atomClass.register' | 'atomAction.register' | 'role.register',
    fn: FunctionAsync<RESULT>,
    options?: IRedlockLockIsolateOptions,
  ): Promise<RESULT>;
  lockIsolate<RESULT, KEY extends string>(
    resource: `atomStatic.register.${KEY}` | `category.register.${KEY}` | `tag.register.${KEY}`,
    fn: FunctionAsync<RESULT>,
    options?: IRedlockLockIsolateOptions,
  ): Promise<RESULT>;
}

@Meta()
export class MetaRedlock extends BeanRedlockBase {}
