import { IMiddlewareOptionsMeta } from './middleware.js';

export interface IControllerRecord {}

export interface IDecoratorControllerOptions {
  path?: string;
  enable?: boolean;
  meta?: IMiddlewareOptionsMeta;
}
