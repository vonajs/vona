import {
  appMetadata,
  MetadataKey,
  RouteHandlerArgumentMetaDecorator,
  RouteHandlerArgumentType,
  SymbolRouteHandlersArgumentsMeta,
} from 'vona';
import { PipeArgument } from '../../types/decorator.js';
import { valid } from '../../bean/pipe.valid.js';

export function createPipesArgumentDecorator(paramType: RouteHandlerArgumentType, extractValue?: Function) {
  return function (field?: any, ...pipes: PipeArgument[]): ParameterDecorator {
    return function (target: object, prop: MetadataKey | undefined, index: number) {
      const argsMeta = appMetadata.getOwnMetadataMap<MetadataKey, RouteHandlerArgumentMetaDecorator[]>(
        SymbolRouteHandlersArgumentsMeta,
        target.constructor,
      );

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

      if (!argsMeta[prop!]) argsMeta[prop!] = [];
      argsMeta[prop!].push({
        index,
        type: paramType,
        field: paramField,
        pipes: paramPipes,
        extractValue,
      });
    };
  };
}
