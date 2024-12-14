import { IOnionOptionsBase, Next, OmitNever, Onion } from 'vona';

export interface IGuardRecordGlobal {}
export interface IGuardRecordLocal {}
export type IGuardRecord = IGuardRecordGlobal & IGuardRecordLocal;

export interface IGuardExecute {
  execute(options: IDecoratorGuardOptions, next: Next): Promise<boolean>;
}

export interface IDecoratorGuardOptions {
  enable?: boolean;
}

export interface IDecoratorGuardOptionsGlobal extends IOnionOptionsBase {
  global: true;
  dependencies?: (keyof IGuardRecordGlobal)[] | keyof IGuardRecordGlobal;
  dependents?: (keyof IGuardRecordGlobal)[] | keyof IGuardRecordGlobal;
}

declare module 'vona-module-a-onion' {
  export interface BeanOnion {
    guard: Onion<IDecoratorGuardOptionsGlobal, keyof IGuardRecord>;
  }
}

declare module 'vona' {
  export interface ConfigOnions {
    guard: OmitNever<IGuardRecord>;
  }

  export interface ISceneCustomRecord {
    guard: never;
  }
}
