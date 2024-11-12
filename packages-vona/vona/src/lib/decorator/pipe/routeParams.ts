import {
  RouteHandlerArgumentMetaDecorator,
  RouteHandlerArgumentType,
  SymbolRouteHandlersArgumentsMeta,
} from '../../../types/interface/pipe.js';
import { appMetadata, MetadataKey } from '../../core/metadata.js';

export function createPipesRouteParamDecorator(paramType: RouteHandlerArgumentType, extractValue?: Function) {
  return function (field?: any, ...pipes: Function[]): ParameterDecorator {
    return function (target: object, prop: MetadataKey | undefined, index: number) {
      const argsMeta = appMetadata.getOwnMetadataMap<MetadataKey, RouteHandlerArgumentMetaDecorator[]>(
        SymbolRouteHandlersArgumentsMeta,
        target.constructor,
      );

      const hasParamField = typeof field !== 'function';
      const paramField = hasParamField ? field : undefined;
      const paramPipes = hasParamField ? pipes : [field, ...pipes];

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
