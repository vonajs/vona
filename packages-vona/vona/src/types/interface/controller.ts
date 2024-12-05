import { IMiddlewareBaseEnable } from './middleware.js';

export interface IControllerRecord {}

export interface IDecoratorControllerOptions extends IMiddlewareBaseEnable {
  path?: string;
}
