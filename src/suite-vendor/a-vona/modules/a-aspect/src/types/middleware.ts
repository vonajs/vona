import { Next, OmitNever } from 'vona';
import { IDecoratorPipeOptions } from './pipe.js';
import { IOnionOptionsBase, IOnionOptionsDeps, IOnionSlice, ServiceOnion } from 'vona-module-a-onion';

export interface IMiddlewareRecordGlobal {}
export interface IMiddlewareRecordLocal {}
export type IMiddlewareRecord = IMiddlewareRecordGlobal & IMiddlewareRecordLocal;

export interface IMiddlewareExecute {
  execute(options: IDecoratorMiddlewareOptions, next: Next): Promise<any>;
}

export interface IDecoratorMiddlewareOptions {
  enable?: boolean;
}

export interface IDecoratorMiddlewareOptionsGlobal
  extends IOnionOptionsBase,
    IOnionOptionsDeps<keyof IMiddlewareRecordGlobal> {
  global: true;
}

export interface IMiddlewareItem<OPTIONS = unknown, ONIONNAME = string, T = unknown>
  extends IOnionSlice<OPTIONS, ONIONNAME, T> {
  // todo: remove
  options: IDecoratorMiddlewareOptionsGlobal;
  // todo: remove
  fromConfig?: boolean;
  argumentPipe?: {
    options?: IDecoratorPipeOptions;
  };
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

  export interface ISceneCustomRecord {
    middleware: never;
  }
}
