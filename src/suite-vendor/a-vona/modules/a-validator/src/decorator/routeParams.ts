import {
  appMetadata,
  MetadataKey,
  RouteHandlerArgumentMetaDecorator,
  RouteHandlerArgumentType,
  SymbolRouteHandlersArgumentsMeta,
} from 'vona';

export function createPipesRouteParamDecorator(paramType: RouteHandlerArgumentType, extractValue?: Function) {
  return function (field?: any, ...pipes: Function[]): ParameterDecorator {
    return function (target: object, prop: MetadataKey | undefined, index: number) {
      const argsMeta = appMetadata.getOwnMetadataMap<MetadataKey, RouteHandlerArgumentMetaDecorator[]>(
        SymbolRouteHandlersArgumentsMeta,
        target.constructor,
      );

      const hasParamField = typeof field === 'string';
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
