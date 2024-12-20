import { appMetadata, MetadataKey } from 'vona';
import { SchemaLike } from '../types/decorator.js';
import { valid } from '../../bean/pipe.valid.js';
import {
  RouteHandlerArgumentMetaDecorator,
  RouteHandlerArgumentType,
  SymbolRouteHandlersArgumentsMeta,
} from 'vona-module-a-aspect';
import { makeSchemaLikes } from '../schema/makeSchemaLikes.js';

export function createPipesArgumentDecorator(paramType: RouteHandlerArgumentType, extractValue?: Function) {
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
      const paramSchemaLikes = hasParamField ? schemaLikes : [field, ...schemaLikes].filter(item => !!item);

      const paramtypes = appMetadata.getMetadata<any[]>('design:paramtypes', target, prop)!;
      const metaType = paramtypes[index];

      const argSchema = makeSchemaLikes(paramSchemaLikes, metaType);

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
