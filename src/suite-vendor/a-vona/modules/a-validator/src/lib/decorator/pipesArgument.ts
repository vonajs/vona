import { appMetadata, MetadataKey } from 'vona';
import { PipeArgument } from '../types/decorator.js';
import { valid } from '../../bean/pipe.valid.js';
import {
  RouteHandlerArgumentMetaDecorator,
  RouteHandlerArgumentType,
  SymbolRouteHandlersArgumentsMeta,
} from 'vona-module-a-aspect';
import { schemaChains } from '../schema/schemaChains.js';

export function createPipesArgumentDecorator(paramType: RouteHandlerArgumentType, extractValue?: Function) {
  return function (field?: any, ...pipes: PipeArgument[]): ParameterDecorator {
    return function (target: object, prop: MetadataKey | undefined, index: number) {
      // not inherit
      const argsMeta = appMetadata.getOwnMetadataArray<RouteHandlerArgumentMetaDecorator>(
        false,
        SymbolRouteHandlersArgumentsMeta,
        target,
        prop,
      );

      const hasParamField = typeof field === 'string';
      const paramField = hasParamField ? field : undefined;
      const paramPipes = hasParamField ? pipes : [field, ...pipes];

      const paramtypes = appMetadata.getMetadata<any[]>('design:paramtypes', target, prop)!;
      const metaType = paramtypes[index];

      const argSchema = schemaChains(paramPipes, metaType);

      argsMeta.push({
        index,
        type: paramType,
        field: paramField,
        pipes: [valid({ schema: argSchema })],
        schema: argSchema,
        extractValue,
      });
    };
  };
}
