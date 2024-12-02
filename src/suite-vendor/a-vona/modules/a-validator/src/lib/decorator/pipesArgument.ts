import {
  appMetadata,
  MetadataKey,
  RouteHandlerArgumentMetaDecorator,
  RouteHandlerArgumentType,
  SymbolRouteHandlersArgumentsMeta,
} from 'vona';
import { valid } from '../../bean/pipe.valid.js';
import { PipeArgument } from '../types/decorator.js';

export function createPipesArgumentDecorator(paramType: RouteHandlerArgumentType, extractValue?: Function) {
  return function (field?: any, ...pipes: PipeArgument[]): ParameterDecorator {
    return function (target: object, prop: MetadataKey | undefined, index: number) {
      // only get own metadata
      let argsMeta = appMetadata.getOwnMetadata<RouteHandlerArgumentMetaDecorator[]>(
        SymbolRouteHandlersArgumentsMeta,
        target,
        prop,
      );
      if (!argsMeta) {
        argsMeta = [];
        appMetadata.defineMetadata(SymbolRouteHandlersArgumentsMeta, argsMeta, target, prop);
      }

      const hasParamField = typeof field === 'string';
      const paramField = hasParamField ? field : undefined;
      let paramPipes = hasParamField ? pipes : [field, ...pipes];

      paramPipes = paramPipes
        .filter(paramPipe => !!paramPipe)
        .map(paramPipe => {
          if (paramPipe.parseAsync) {
            // schema
            return valid({ schema: paramPipe });
          } else if (paramPipe.prototype?.constructor?.name) {
            // class
            return valid({ class: paramPipe });
          } else {
            // pipe
            return paramPipe;
          }
        });

      argsMeta.push({
        index,
        type: paramType,
        field: paramField,
        pipes: paramPipes,
        extractValue,
      });
    };
  };
}
