import { Constructable } from '../../lib/index.js';
import { Type } from '../utils/type.js';
import { IMiddlewareBase } from './middleware.js';

export interface IPipeRecordGlobal {}
export interface IPipeRecordLocal {}
export type IPipeRecord = IPipeRecordGlobal & IPipeRecordLocal;

export interface IPipeTransform<T = any, R = any> {
  transform(value: T, metadata: RouteHandlerArgumentMeta, options: IDecoratorPipeOptions): Promise<R>;
}

export interface IDecoratorPipeOptions {
  enable?: boolean;
}

export interface IDecoratorPipeOptionsGlobal extends IMiddlewareBase {
  global: true;
  dependencies?: (keyof IPipeRecordGlobal)[] | keyof IPipeRecordGlobal;
  dependents?: (keyof IPipeRecordGlobal)[] | keyof IPipeRecordGlobal;
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
