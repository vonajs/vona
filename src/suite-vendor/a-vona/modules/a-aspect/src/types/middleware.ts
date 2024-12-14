import { VonaMetaFlavor, VonaMetaMode } from 'vona-shared';
import {
  IDecoratorBeanOptionsBase,
  IOnionSliceBase,
  IOnionSliceEnable,
  Next,
  OmitNever,
  Onion,
  VonaContext,
} from 'vona';

export const SymbolUseMiddlewareLocal = Symbol('SymbolUseMiddlewareLocal');

export const SymbolUseMiddlewareOptions = Symbol('SymbolUseMiddlewareOptions');
export type TypeUseMiddlewareGlobalLikeOptions<T> = Omit<
  T,
  'global' | 'dependencies' | 'dependents' | 'ignore' | 'match'
>;

export interface IMiddlewareRecordGlobal {}
export interface IMiddlewareRecordLocal {}
export type IMiddlewareRecord = IMiddlewareRecordGlobal & IMiddlewareRecordLocal;

export interface IMiddlewareBase extends IOnionSliceBase {
  match?: ((ctx: VonaContext) => boolean) | RegExp | string;
  ignore?: ((ctx: VonaContext) => boolean) | RegExp | string;
}

export interface IMiddlewareExecute {
  execute(options: IDecoratorMiddlewareOptions, next: Next): Promise<any>;
}

export interface IDecoratorMiddlewareOptions {
  enable?: boolean;
}

export interface IDecoratorMiddlewareOptionsGlobal extends IMiddlewareBase {
  global: true;
  dependencies?: (keyof IMiddlewareRecordGlobal)[] | keyof IMiddlewareRecordGlobal;
  dependents?: (keyof IMiddlewareRecordGlobal)[] | keyof IMiddlewareRecordGlobal;
}

// todo: 继承自IOnionSlice
export interface IMiddlewareItem<OPTIONS = unknown, MIDDLEWARENAME = string, T = unknown> {
  name: MIDDLEWARENAME;
  options: IDecoratorMiddlewareOptionsGlobal;
  beanOptions: IDecoratorBeanOptionsBase<T, OPTIONS>;
  fromConfig?: boolean;
  argumentPipe?: {
    options?: object; // todo: IDecoratorPipeOptions;
  };
}

declare module 'vona-module-a-onion' {
  export interface BeanOnion {
    middleware: Onion<IDecoratorMiddlewareOptionsGlobal, keyof IMiddlewareRecord>;
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
