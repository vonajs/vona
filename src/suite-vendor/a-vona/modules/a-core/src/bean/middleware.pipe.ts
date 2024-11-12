import {
  appMetadata,
  RouteHandlerArgumentMeta,
  BeanBase,
  Constructable,
  IDecoratorMiddlewareOptionsGlobal,
  IMiddlewareExecute,
  IPipeTransform,
  RouteHandlerArgumentMetaDecorator,
  MetadataKey,
  Middleware,
  Next,
  SymbolRouteHandlersArgumentsMeta,
  SymbolRouteHandlersArgumentsValue,
} from 'vona';
import { MiddlewareLike } from '../common/middlewareLike.js';
import { extractValue } from '../common/extractValue.js';

export interface IMiddlewareOptionsPipe extends IDecoratorMiddlewareOptionsGlobal {}

@Middleware<IMiddlewareOptionsPipe>({ global: true, dependencies: 'a-core:interceptor' })
export class MiddlewarePipe extends BeanBase implements IMiddlewareExecute {
  private middlewareLike: MiddlewareLike;

  protected __init__() {
    this.middlewareLike = this.bean._newBean(MiddlewareLike, 'pipe');
  }

  async execute(_options: IMiddlewareOptionsPipe, next: Next) {
    // todo: support fromConfig
    const handler = this.ctx.getHandler();
    if (!handler) return next();
    // arguments
    this.ctx[SymbolRouteHandlersArgumentsValue] = await this._transformArguments(this.ctx.getClass(), handler);
    // next
    return next();
  }
}
