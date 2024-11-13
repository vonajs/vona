import { VonaContext } from '../../../types/context/index.js';
import { Next } from '../../../types/interface/middleware.js';
import {
  IPipeTransform,
  RouteHandlerArgumentMeta,
  RouteHandlerArgumentMetaDecorator,
  SymbolRouteHandlersArgumentsMeta,
  SymbolRouteHandlersArgumentsValue,
} from '../../../types/interface/pipe.js';
import { appMetadata, MetadataKey } from '../../core/metadata.js';
import { Constructable } from '../../decorator/type/constructable.js';
import { extractValue } from './extractValue.js';

export async function middlewarePipe(ctx: VonaContext, next: Next) {
  // todo: support fromConfig
  const handler = ctx.getHandler();
  if (!handler) return next();
  // arguments
  ctx[SymbolRouteHandlersArgumentsValue] = await _transformArguments(ctx, ctx.getClass(), handler);
  // next
  return next();
}

async function _transformArguments(
  ctx: VonaContext,
  controller: Constructable,
  handler: Function,
): Promise<any[] | undefined> {
  const paramtypes = appMetadata.getMetadata<any[]>('design:paramtypes', controller.prototype, handler.name);
  if (!paramtypes) return;

  // meta
  const argsMetaAll = appMetadata.getOwnMetadataMap<MetadataKey, RouteHandlerArgumentMetaDecorator[]>(
    SymbolRouteHandlersArgumentsMeta,
    controller,
  );
  const argsMeta = argsMetaAll[handler.name];
  if (!argsMeta) return;

  // args
  const args = Array(paramtypes.length);
  for (let index = args.length - 1; index >= 0; index--) {
    const argMeta = argsMeta.find(item => item.index === index);
    if (!argMeta) continue;
    // extractValue
    const value = await _extractArgumentValue(ctx, argMeta);
    // metadata
    const metadata: RouteHandlerArgumentMeta = {
      type: argMeta.type,
      field: argMeta.field,
      metaType: paramtypes[index],
      controller,
      method: handler.name,
      index: argMeta.index,
    };
    // transform
    args[index] = await _transformArgument(ctx, argMeta, metadata, value);
  }
  return args;
}

async function _transformArgument(
  ctx: VonaContext,
  argMeta: RouteHandlerArgumentMetaDecorator,
  metadata: RouteHandlerArgumentMeta,
  value: any,
) {
  // pipes
  const pipes = ctx.app.meta.middlewaresPipe.composePipes(
    ctx,
    argMeta,
    (beanInstance: IPipeTransform, options, value) => {
      return beanInstance.transform(value, metadata, options);
    },
  );
  if (pipes.length === 0) return value;
  // apply
  for (const pipe of pipes) {
    value = await pipe(ctx, value);
  }
  return value;
}

async function _extractArgumentValue(ctx: VonaContext, argMeta: RouteHandlerArgumentMetaDecorator) {
  if (argMeta.extractValue) {
    return await argMeta.extractValue(ctx, argMeta);
  }
  return extractValue(ctx, argMeta);
}
