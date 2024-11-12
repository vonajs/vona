import { Type } from '../utils/type.js';
import { IMiddlewareBase } from './middleware.js';

export interface IPipeRecordGlobal {}
export interface IPipeRecordLocal {}
export type IPipeRecord = IPipeRecordGlobal & IPipeRecordLocal;

export interface IPipeTransform<T = any, R = any> {
  transform(value: T, metadata: ArgumentMetadata, options: IDecoratorPipeOptions): Promise<R>;
}

export interface IDecoratorPipeOptions extends IMiddlewareBase {
  global?: boolean;
  dependencies?: (keyof IPipeRecordGlobal)[] | keyof IPipeRecordGlobal;
  dependents?: (keyof IPipeRecordGlobal)[] | keyof IPipeRecordGlobal;
}

export type Paramtype = 'body' | 'query' | 'param' | 'custom';

export enum RouteParamtypes {
  REQUEST = 0,
  RESPONSE = 1,
  NEXT = 2,
  BODY = 3,
  QUERY = 4,
  PARAM = 5,
  HEADERS = 6,
  SESSION = 7,
  FILE = 8,
  FILES = 9,
  HOST = 10,
  IP = 11,
  RAW_BODY = 12,
}

export const SymbolRouteHandlersArgumentsMeta = Symbol('SymbolRouteHandlersArgumentsMeta');
export interface IRouteHandlerArgumentMeta {
  index: number;
  type: RouteParamtypes;
  field?: string;
  pipes: Function[];
  extractValue?: Function;
}

export interface ArgumentMetadata {
  type: Paramtype;
  field?: string;
  metaType?: Type<any>;
}
