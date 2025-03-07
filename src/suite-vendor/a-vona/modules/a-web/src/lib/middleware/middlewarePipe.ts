import type { Constructable, Next, VonaContext } from 'vona';
import type { IDecoratorPipeOptionsGlobal, IPipeRecord, IPipeTransform } from 'vona-module-a-aspect';
import type { ServiceOnion } from 'vona-module-a-onion';
import type { IOnionExecuteCustom } from 'vona-module-a-onion';
import type { RouteHandlerArgumentMeta, RouteHandlerArgumentMetaDecorator } from 'vona-module-a-openapi';
import { appMetadata } from 'vona';
import {

  SymbolRouteHandlersArgumentsMeta,
  SymbolRouteHandlersArgumentsValue,
} from 'vona-module-a-openapi';
import { valid } from 'vona-module-a-validation';
import { extractValue } from './extractValue.ts';

export async function middlewarePipe(ctx: VonaContext, next: Next) {
  // check handler
  const handler = ctx.getHandler();
  if (!handler) return next();
  // body parser
  
  // arguments
  ctx[SymbolRouteHandlersArgumentsValue] = await _transformArguments(ctx, ctx.getController()!, handler);
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
  const args = Array.from({ length: paramtypes.length });
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
  const pipes = composePipes(ctx, argMeta, (beanInstance: IPipeTransform, value, options, _next) => {
    return beanInstance.transform(value, metadata, options);
  });
  if (pipes.length === 0) return value;
  // apply
  for (const pipe of pipes) {
    value = await pipe(value, _pipeNextDefault);
  }
  return value;
}

function _pipeNextDefault(value: any) {
  return value;
}

async function _extractArgumentValue(ctx: VonaContext, argMeta: RouteHandlerArgumentMetaDecorator) {
  if (argMeta.extractValue) {
    return await argMeta.extractValue(ctx, argMeta);
  }
  return extractValue(ctx, argMeta);
}

const SymbolCacheMiddlewaresArgument = Symbol('SymbolCacheMiddlewaresArgument');

function composePipes(
  ctx: VonaContext,
  argMeta: RouteHandlerArgumentMetaDecorator,
  executeCustom: IOnionExecuteCustom,
) {
  if (!ctx.app.meta[SymbolCacheMiddlewaresArgument]) ctx.app.meta[SymbolCacheMiddlewaresArgument] = {};
  const __cacheMiddlewaresArgument: Record<string, Function[]> = ctx.app.meta[SymbolCacheMiddlewaresArgument];
  const onionPipe = ctx.app.bean.onion.pipe;
  const beanFullName = ctx.getControllerBeanFullName();
  const handlerName = ctx.getHandler()!.name;
  const key = `${beanFullName}:${handlerName}:${argMeta.index}`;
  if (!__cacheMiddlewaresArgument[key]) {
    const middlewares: Function[] = [];
    // pipes: global
    for (const item of onionPipe.onionsGlobal) {
      middlewares.push(onionPipe._wrapOnion(item, executeCustom));
    }
    // pipes: route
    const middlewaresLocal = onionPipe._collectOnionsHandler(ctx);
    for (const item of middlewaresLocal) {
      middlewares.push(onionPipe._wrapOnion(item, executeCustom));
    }
    // pipes: arguments
    const middlewaresArgument = _collectArgumentMiddlewares(onionPipe, argMeta);
    if (middlewaresArgument) {
      for (const item of middlewaresArgument) {
        middlewares.push(onionPipe._wrapOnion(item, executeCustom));
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
    if (typeof pipe !== 'function') {
      pipe = valid({ schema: pipe }) as Function;
    }
    const { pipeName, options } = pipe();
    const item = onionPipe.onionsNormal[pipeName];
    if (!item) throw new Error(`${onionPipe.sceneName} not found: ${pipeName}`);
    return {
      ...item,
      argumentPipe: {
        options,
      },
    };
  });
}
