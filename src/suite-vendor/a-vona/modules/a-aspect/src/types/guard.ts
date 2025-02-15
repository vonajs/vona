import type { Next, OmitNever } from 'vona';
import type { IOnionOptionsBase, IOnionOptionsDeps, ServiceOnion } from 'vona-module-a-onion';
import type { IApiPathRecord } from 'vona-module-a-web';

export interface IGuardRecordGlobal {}
export interface IGuardRecordLocal {}
export type IGuardRecord = IGuardRecordGlobal & IGuardRecordLocal;

export interface IGuardExecute {
  execute: (options: IDecoratorGuardOptions, next: Next) => Promise<boolean>;
}

export interface IDecoratorGuardOptions {
  enable?: boolean;
}

export interface IDecoratorGuardOptionsGlobal
  extends IOnionOptionsBase<keyof IApiPathRecord>,
  IOnionOptionsDeps<keyof IGuardRecordGlobal> {
  global: true;
}

declare module 'vona-module-a-onion' {
  export interface BeanOnion {
    guard: ServiceOnion<IDecoratorGuardOptionsGlobal, keyof IGuardRecord>;
  }
}

declare module 'vona' {
  export interface ConfigOnions {
    guard: OmitNever<IGuardRecord>;
  }

  export interface IBeanSceneRecord {
    guard: never;
  }
}
