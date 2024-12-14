import { appMetadata, Constructable, Next, Onion, VonaContext } from 'vona';
import { extractValue } from './extractValue.js';
import {
  IDecoratorPipeOptionsGlobal,
  IPipeRecord,
  IPipeTransform,
  RouteHandlerArgumentMeta,
  RouteHandlerArgumentMetaDecorator,
  SymbolRouteHandlersArgumentsMeta,
  SymbolRouteHandlersArgumentsValue,
} from 'vona-module-a-aspect';

export async function middlewarePipe(ctx: VonaContext, next: Next) {
  // todo: support fromConfig
  const handler = ctx.getHandler();
  if (!handler) return next();
  // arguments
  ctx[SymbolRouteHandlersArgumentsValue] = await _transformArguments(ctx, ctx.getClass()!, handler);
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
  const argsMeta = appMetadata.getMetadata<RouteHandlerArgumentMetaDecorator[]>(
    SymbolRouteHandlersArgumentsMeta,
    controller.prototype,
    handler.name,
  );
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
  const pipes = composePipes(ctx, argMeta, (beanInstance: IPipeTransform, options, value) => {
    return beanInstance.transform(value, metadata, options);
  });
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

const __cacheMiddlewaresArgument: Record<string, Function[]> = {};

function composePipes(ctx: VonaContext, argMeta: RouteHandlerArgumentMetaDecorator, executeCustom: Function) {
  const onionPipe = ctx.app.bean.onion.pipe;
  const beanFullName = ctx.getClassBeanFullName();
  const handlerName = ctx.getHandler()!.name;
  const key = `${beanFullName}:${handlerName}:${argMeta.index}`;
  if (!__cacheMiddlewaresArgument[key]) {
    const middlewares: Function[] = [];
    // pipes: global
    for (const item of onionPipe.middlewaresGlobal) {
      middlewares.push(onionPipe._wrapMiddleware(item, executeCustom));
    }
    // pipes: route
    const middlewaresLocal = onionPipe._collectMiddlewaresHandler(ctx);
    for (const item of middlewaresLocal) {
      middlewares.push(onionPipe._wrapMiddleware(item, executeCustom));
    }
    // pipes: arguments
    const middlewaresArgument = _collectArgumentMiddlewares(onionPipe, argMeta);
    if (middlewaresArgument) {
      for (const item of middlewaresArgument) {
        middlewares.push(onionPipe._wrapMiddleware(item, executeCustom));
      }
    }
    __cacheMiddlewaresArgument[key] = middlewares;
  }
  return __cacheMiddlewaresArgument[key];
}

function _collectArgumentMiddlewares(
  onionPipe: ServiceOnion<IDecoratorPipeOptionsGlobal, keyof IPipeRecord>,
  argMeta: RouteHandlerArgumentMetaDecorator,
) {
  if (!argMeta.pipes) return;
  return argMeta.pipes.map(pipe => {
    const { pipeName, options } = pipe();
    const item = onionPipe.middlewaresNormal[pipeName];
    if (!item) throw new Error(`${onionPipe.sceneName} not found: ${pipeName}`);
    return {
      ...item,
      argumentPipe: {
        options: options,
      },
    };
  });
}
