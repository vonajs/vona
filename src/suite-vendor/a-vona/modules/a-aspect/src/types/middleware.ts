import type { Next, OmitNever } from 'vona';
import type { IOnionOptionsBase, IOnionOptionsDeps, IOnionOptionsEnable, ServiceOnion } from 'vona-module-a-onion';
import type { IApiPathRecord } from 'vona-module-a-web';

export interface IMiddlewareRecordGlobal {}
export interface IMiddlewareRecordLocal {}
export type IMiddlewareRecord = IMiddlewareRecordGlobal & IMiddlewareRecordLocal;

export interface IMiddlewareExecute {
  execute(options: IDecoratorMiddlewareOptions, next: Next): Promise<any>;
}

export interface IDecoratorMiddlewareOptions extends IOnionOptionsEnable {}

export interface IDecoratorMiddlewareOptionsGlobal
  extends IOnionOptionsBase<keyof IApiPathRecord>,
  IOnionOptionsDeps<keyof IMiddlewareRecordGlobal> {
  global: true;
}

declare module 'vona-module-a-onion' {
  export interface BeanOnion {
    middleware: ServiceOnion<IDecoratorMiddlewareOptionsGlobal, keyof IMiddlewareRecord>;
  }
}

declare module 'vona' {
  export interface ConfigOnions {
    middleware: OmitNever<IMiddlewareRecord>;
  }

  export interface IBeanSceneRecord {
    middleware: never;
  }
}
