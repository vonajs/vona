import type { MetadataKey } from 'vona';
import type {
  RouteHandlerArgumentMetaDecorator,
  RouteHandlerArgumentType,
  SchemaLike,
  TypeExtractValue,
} from '../../types/decorator.ts';
import { appMetadata } from 'vona';
import { z } from 'zod';
import {
  SymbolRouteHandlersArgumentsMeta,
} from '../../types/decorator.ts';
import { makeSchemaLikes } from '../schema/makeSchemaLikes.ts';

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
      let metaType;
      if (paramType === 'file') {
        metaType = z.string().openapi({ format: 'binary' });
      } else if (paramType === 'files') {
        metaType = z.array(z.string().openapi({ format: 'binary' }));
      } else {
        metaType = paramtypes[index];
      }

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
