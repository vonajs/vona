import { VonaContext } from '../context/index.js';

export interface IMiddlewareBase {
  enable?: boolean;
  match?: ((ctx: VonaContext) => boolean) | RegExp | string;
  ignore: ((ctx: VonaContext) => boolean) | RegExp | string;
}
