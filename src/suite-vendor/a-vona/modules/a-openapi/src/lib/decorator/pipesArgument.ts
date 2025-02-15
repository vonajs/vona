import type { MetadataKey } from 'vona';
import type {
  RouteHandlerArgumentMetaDecorator,
  RouteHandlerArgumentType,
  SchemaLike,
  TypeExtractValue,
} from '../../types/decorator.js';
import { appMetadata } from 'vona';
import {
  SymbolRouteHandlersArgumentsMeta,
} from '../../types/decorator.js';
import { makeSchemaLikes } from '../schema/makeSchemaLikes.js';

export function createPipesArgumentDecorator(paramType: RouteHandlerArgumentType, extractValue?: TypeExtractValue) {
  return function (field?: string | SchemaLike, ...schemaLikes: SchemaLike[]): ParameterDecorator {
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
      const paramSchemaLikes = hasParamField ? schemaLikes : [field!, ...schemaLikes].filter(item => !!item);

      const paramtypes = appMetadata.getMetadata<any[]>('design:paramtypes', target, prop)!;
      const metaType = paramtypes[index];

      const argSchema = makeSchemaLikes(paramSchemaLikes, metaType);

      argsMeta.push({
        index,
        type: paramType,
        field: paramField,
        pipes: [argSchema],
        schema: argSchema,
        extractValue,
      });
    };
  };
}
