import { Constructable, OmitNever, Type } from 'vona';
import { IOnionOptionsBase, IOnionOptionsDeps, ServiceOnion } from 'vona-module-a-onion';
import { z } from 'zod';

export interface IPipeRecordGlobal {}
export interface IPipeRecordLocal {}
export type IPipeRecord = IPipeRecordGlobal & IPipeRecordLocal;

export interface IPipeTransform<T = any, R = any> {
  transform(value: T, metadata: RouteHandlerArgumentMeta, options: IDecoratorPipeOptions): Promise<R>;
}

export interface IDecoratorPipeOptions {
  enable?: boolean;
}

export interface IDecoratorPipeOptionsGlobal extends IOnionOptionsBase, IOnionOptionsDeps<keyof IPipeRecordGlobal> {
  global: true;
}

export type RouteHandlerArgumentType =
  | 'request'
  | 'response'
  | 'body'
  | 'query'
  | 'param'
  | 'headers'
  | 'session'
  | 'file'
  | 'files'
  | 'host'
  | 'ip'
  | 'rawBody'
  | 'string';

export const SymbolRouteHandlersArgumentsMeta = Symbol('SymbolRouteHandlersArgumentsMeta');
export const SymbolRouteHandlersArgumentsValue = Symbol('SymbolRouteHandlersArgumentsValue');

export interface RouteHandlerArgumentMetaDecorator {
  index: number;
  type: RouteHandlerArgumentType;
  field?: string;
  pipes: Function[];
  schema: z.ZodSchema;
  extractValue?: Function;
}

export interface RouteHandlerArgumentMeta {
  type: RouteHandlerArgumentType;
  field?: string;
  metaType?: Type<any>;
  controller: Constructable;
  method: string;
  index: number;
}

declare module 'vona-module-a-onion' {
  export interface BeanOnion {
    pipe: ServiceOnion<IDecoratorPipeOptionsGlobal, keyof IPipeRecord>;
  }
}

declare module 'vona' {
  export interface ConfigOnions {
    pipe: OmitNever<IPipeRecord>;
  }

  export interface ISceneCustomRecord {
    pipe: never;
  }
}
