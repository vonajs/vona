import {
  appMetadata,
  BeanBase,
  Constructable,
  IDecoratorMiddlewareOptions,
  IMiddlewareExecute,
  IRouteHandlerArgumentMeta,
  MetadataKey,
  Middleware,
  Next,
  SymbolRouteHandlersArgumentsMeta,
} from 'vona';
import { MiddlewareLike } from '../common/middlewareLike.js';
import { extractValue } from '../common/extractValue.js';

export interface IMiddlewareOptionsPipe extends IDecoratorMiddlewareOptions {}

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
    this.ctx.state.arguments = await this._transformArguments(this.ctx.getClass(), handler);
    // // arguments
    // const argsMeta = appMetadata.getOwnMetadataMap<MetadataKey, IRouteHandlerArgumentMeta[]>(
    //   SymbolRouteHandlersArgumentsMeta,
    //   this.ctx.getClass(),
    // );
    // const argsLength = argsMeta[handler.name].length;
    // console.log(argsLength);
    // // compose
    // await this.middlewareLike.composeAsync()(this.ctx);
    // next
    return next();
  }

  async _transformArguments(constroller: Constructable, handler: Function): Promise<any[] | undefined> {
    const paramtypes = appMetadata.getMetadata<any[]>('design:paramtypes', constroller.prototype, handler.name);
    if (!paramtypes) return;

    // meta
    const argsMetaAll = appMetadata.getOwnMetadataMap<MetadataKey, IRouteHandlerArgumentMeta[]>(
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
      const value = this._extractArgumentValue(argMeta);
      // transform
      args[index] = await this._transformArgument(constroller, handler, argMeta, value);
    }
    return args;
  }

  async _transformArgument(
    constroller: Constructable,
    handler: Function,
    argMeta: IRouteHandlerArgumentMeta,
    value: any,
  ) {
    //
  }

  _extractArgumentValue(argMeta: IRouteHandlerArgumentMeta) {
    if (argMeta.extractValue) {
      return argMeta.extractValue(this.ctx, argMeta);
    }
    return extractValue(this.ctx, argMeta);
  }
}
