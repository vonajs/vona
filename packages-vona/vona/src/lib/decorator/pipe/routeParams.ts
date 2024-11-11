import {
  IRouteParamPipeOptionsItem,
  RouteParamtypes,
  SymbolCreateRouteParamPipeOptions,
} from '../../../types/interface/pipe.js';
import { appMetadata, MetadataKey } from '../../core/metadata.js';

export function createPipesRouteParamDecorator(paramtype: RouteParamtypes) {
  return function (data?: any, ...pipes: Function[]): ParameterDecorator {
    return function (target: object, prop: MetadataKey | undefined, index: number) {
      const argsMeta = appMetadata.getOwnMetadataMap<MetadataKey, IRouteParamPipeOptionsItem[]>(
        SymbolCreateRouteParamPipeOptions,
        target.constructor,
      );

      const hasParamData = typeof data !== 'function';
      const paramData = hasParamData ? data : undefined;
      const paramPipes = hasParamData ? pipes : [data, ...pipes];

      if (!argsMeta[prop!]) argsMeta[prop!] = [];
      argsMeta[prop!].push({
        index,
        paramtype,
        paramData,
        paramPipes,
      });
    };
  };
}
