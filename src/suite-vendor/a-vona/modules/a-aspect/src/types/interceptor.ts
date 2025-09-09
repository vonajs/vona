import type { Next, OmitNever } from 'vona';
import type { IOnionOptionsBase, IOnionOptionsDeps, IOnionOptionsEnable, ServiceOnion } from 'vona-module-a-onion';
import type { IApiPathRecord } from 'vona-module-a-web';

export interface IInterceptorRecordGlobal {}
export interface IInterceptorRecordLocal {}
export type IInterceptorRecord = IInterceptorRecordGlobal & IInterceptorRecordLocal;

export interface IInterceptorExecute {
  execute(options: IDecoratorInterceptorOptions, next: Next): Promise<any>;
}

export interface IDecoratorInterceptorOptions extends IOnionOptionsEnable {}

export interface IDecoratorInterceptorOptionsGlobal
  extends IOnionOptionsBase<keyof IApiPathRecord>,
  IOnionOptionsDeps<keyof IInterceptorRecordGlobal> {
  global: true;
}

declare module 'vona-module-a-onion' {
  export interface BeanOnion {
    interceptor: ServiceOnion<IInterceptorRecord>;
  }
}

declare module 'vona' {
  export interface ConfigOnions {
    interceptor: OmitNever<IInterceptorRecord>;
  }

  export interface IBeanSceneRecord {
    interceptor: never;
  }
}
