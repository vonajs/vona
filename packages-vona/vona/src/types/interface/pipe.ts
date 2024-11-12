import { Type } from '../utils/type.js';
import { IMiddlewareBase } from './middleware.js';

export interface IPipeRecordGlobal {}
export interface IPipeRecordLocal {}
export type IPipeRecord = IPipeRecordGlobal & IPipeRecordLocal;

export interface IPipeTransform<T = any, R = any> {
  transform(value: T, metadata: RouteHandlerArgumentMeta, options: IDecoratorPipeOptions): Promise<R>;
}

export interface IDecoratorPipeOptions extends IMiddlewareBase {
  global?: boolean;
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
  | 'rawBody';

export const SymbolRouteHandlersArgumentsMeta = Symbol('SymbolRouteHandlersArgumentsMeta');
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
}
