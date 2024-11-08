import { VonaContext } from '../context/index.js';

export type Next = () => Promise<any>;

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
  dependencies?: string[] | string;
  dependents?: string[] | string;
}
