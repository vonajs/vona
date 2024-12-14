import { IOnionOptionsBase, IOnionOptionsDeps, Next, OmitNever, Onion } from 'vona';

export interface IInterceptorRecordGlobal {}
export interface IInterceptorRecordLocal {}
export type IInterceptorRecord = IInterceptorRecordGlobal & IInterceptorRecordLocal;

export interface IInterceptorExecute {
  execute(options: IDecoratorInterceptorOptions, next: Next): Promise<any>;
}

export interface IDecoratorInterceptorOptions {
  enable?: boolean;
}

export interface IDecoratorInterceptorOptionsGlobal
  extends IOnionOptionsBase,
    IOnionOptionsDeps<keyof IInterceptorRecordGlobal> {
  global: true;
}

declare module 'vona-module-a-onion' {
  export interface BeanOnion {
    interceptor: Onion<IDecoratorInterceptorOptionsGlobal, keyof IInterceptorRecord>;
  }
}

declare module 'vona' {
  export interface ConfigOnions {
    interceptor: OmitNever<IInterceptorRecord>;
  }

  export interface ISceneCustomRecord {
    interceptor: never;
  }
}
