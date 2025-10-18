import type { IBeanRecord, Next, OmitNever } from 'vona';
import type { IOnionOptionsDeps, IOnionOptionsEnable, IOnionOptionsMatch, ServiceOnion, TypeOnionOptionsMatchRule } from 'vona-module-a-onion';

export type AopAction<T extends {}, NAME extends keyof T, RESULT = undefined> =
  (args: Parameters<T[NAME]>, next: Next<Parameters<T[NAME]>, Awaited<ReturnType<T[NAME]>>>, _receiver: T)
  => RESULT extends undefined ? ReturnType<T[NAME]> : Promise<RESULT>;
export type AopActionSync<T extends {}, NAME extends keyof T, RESULT = undefined> =
  (args: Parameters<T[NAME]>, next: Next<Parameters<T[NAME]>, ReturnType<T[NAME]>>, _receiver: T)
  => RESULT extends undefined ? ReturnType<T[NAME]> : RESULT;
export interface IAopRecord {}

export interface IDecoratorAopOptions
  extends IOnionOptionsEnable,
  IOnionOptionsMatch<TypeOnionOptionsMatchRule<keyof IBeanRecord>>,
  IOnionOptionsDeps<keyof IAopRecord> {}

declare module 'vona-module-a-onion' {
  export interface BeanOnion {
    aop: ServiceOnion<IAopRecord>;
  }
}

declare module 'vona' {
  export interface ConfigOnions {
    aop: OmitNever<IAopRecord>;
  }

  export interface IBeanSceneRecord {
    aop: never;
  }
}
