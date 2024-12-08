import { VonaMetaFlavor, VonaMetaMode } from 'vona-shared';
import { IDecoratorBeanOptionsBase } from '../../lib/index.js';
import { VonaContext } from '../context/index.js';
import { IDecoratorPipeOptions } from './pipe.js';

export const SymbolUseMiddlewareLocal = Symbol('SymbolUseMiddlewareLocal');

export const SymbolUseMiddlewareOptions = Symbol('SymbolUseMiddlewareOptions');
export type TypeUseMiddlewareGlobalLikeOptions<T> = Omit<
  T,
  'global' | 'dependencies' | 'dependents' | 'ignore' | 'match'
>;

export type Next = () => Promise<any>;
export type NextSync = () => any;

export interface IMiddlewareRecordGlobal {}
export interface IMiddlewareRecordLocal {}
export type IMiddlewareRecord = IMiddlewareRecordGlobal & IMiddlewareRecordLocal;

export interface IMiddlewareOptionsMeta {
  flavor?: VonaMetaFlavor | VonaMetaFlavor[];
  mode?: VonaMetaMode | VonaMetaMode[];
}

export interface IMiddlewareBaseEnable {
  enable?: boolean;
  meta?: IMiddlewareOptionsMeta;
}

export interface IMiddlewareBase extends IMiddlewareBaseEnable {
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

export interface IMiddlewareItem<OPTIONS = unknown, T = unknown> {
  name: string;
  options: IDecoratorMiddlewareOptionsGlobal;
  beanOptions: IDecoratorBeanOptionsBase<T, OPTIONS>;
  fromConfig?: boolean;
  argumentPipe?: {
    options?: IDecoratorPipeOptions;
  };
}
