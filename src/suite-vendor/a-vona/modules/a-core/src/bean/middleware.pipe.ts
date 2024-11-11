import {
  appMetadata,
  BeanBase,
  IDecoratorMiddlewareOptions,
  IMiddlewareExecute,
  IRouteParamPipeOptionsItem,
  MetadataKey,
  Middleware,
  Next,
  SymbolCreateRouteParamPipeOptions,
} from 'vona';
import { MiddlewareLike } from '../common/middlewareLike.js';

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
    this.ctx.state.arguments = await this._transformArguments();
    // // arguments
    // const argsMeta = appMetadata.getOwnMetadataMap<MetadataKey, IRouteParamPipeOptionsItem[]>(
    //   SymbolCreateRouteParamPipeOptions,
    //   this.ctx.getClass(),
    // );
    // const argsLength = argsMeta[handler.name].length;
    // console.log(argsLength);
    // // compose
    // await this.middlewareLike.composeAsync()(this.ctx);
    // next
    return next();
  }

  async _transformArguments(): Promise<any[] | undefined> {
    const paramtypes = appMetadata.getMetadata<any[]>(
      'design:paramtypes',
      this.ctx.getClass().prototype,
      this.ctx.getHandler().name,
    );
    if (!paramtypes) return;
    console.log(paramtypes.length);
  }
}
