import { IDecoratorBeanOptionsBase } from '../../lib/index.js';
import { VonaContext } from '../context/index.js';

export type Next = () => Promise<any>;

export interface IMiddlewareRecordGlobal {}
export interface IMiddlewareRecordLocal {}
export type IMiddlewareRecord = IMiddlewareRecordGlobal & IMiddlewareRecordLocal;

export interface IMiddlewareBase {
  enable?: boolean;
  match?: ((ctx: VonaContext) => boolean) | RegExp | string;
  ignore?: ((ctx: VonaContext) => boolean) | RegExp | string;
}

export interface IMiddlewareExecute {
  execute(options: IDecoratorMiddlewareOptions, next: Next): Promise<any>;
}

export interface IDecoratorMiddlewareOptions extends IMiddlewareBase {
  global?: boolean;
  dependencies?: (keyof IMiddlewareRecordGlobal)[] | keyof IMiddlewareRecordGlobal;
  dependents?: (keyof IMiddlewareRecordGlobal)[] | keyof IMiddlewareRecordGlobal;
}

export interface IMiddlewareItem {
  name: string;
  options: IDecoratorMiddlewareOptions;
  beanOptions: IDecoratorBeanOptionsBase;
  fromConfig?: boolean;
}
