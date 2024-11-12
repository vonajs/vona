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

  async _transformArguments(constroller: Constructable, handler: Function): Promise<any[] | undefined> {
    const paramtypes = appMetadata.getMetadata<any[]>('design:paramtypes', constroller.prototype, handler.name);
    if (!paramtypes) return;

    // meta
    const argsMetaAll = appMetadata.getOwnMetadataMap<MetadataKey, RouteHandlerArgumentMetaDecorator[]>(
      SymbolRouteHandlersArgumentsMeta,
      constroller,
    );
    const argsMeta = argsMetaAll[handler.name];
    if (!argsMeta) return;

    // args
    const args = Array(paramtypes.length);
    for (let index = 0; index < args.length; index++) {
      const argMeta = argsMeta.find(item => item.index === index);
      if (!argMeta) continue;
      // extractValue
      const value = await this._extractArgumentValue(argMeta);
      // metadata
      const metadata = {
        type: argMeta.type,
        field: argMeta.field,
        metaType: paramtypes[index],
      };
      // transform
      args[index] = await this._transformArgument(argMeta, metadata, value);
    }
    return args;
  }

  async _transformArgument(argMeta: RouteHandlerArgumentMetaDecorator, metadata: RouteHandlerArgumentMeta, value: any) {
    // pipes
    const pipes = this.middlewareLike.collectPipes(argMeta, (beanInstance: IPipeTransform, options, value) => {
      return beanInstance.transform(value, metadata, options);
    });
    if (pipes.length === 0) return value;
    // apply
    for (const pipe of pipes) {
      value = await pipe(this.ctx, value);
    }
    return value;
  }

  async _extractArgumentValue(argMeta: RouteHandlerArgumentMetaDecorator) {
    if (argMeta.extractValue) {
      return await argMeta.extractValue(this.ctx, argMeta);
    }
    return extractValue(this.ctx, argMeta);
  }
}
