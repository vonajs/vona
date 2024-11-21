import {
  appMetadata,
  Constructable,
  MetadataKey,
  RouteHandlerArgumentMetaDecorator,
  RouteHandlerArgumentType,
  SymbolRouteHandlersArgumentsMeta,
} from 'vona';
import { z } from 'zod';

export function createSchemaRouteParamDecorator(paramType: RouteHandlerArgumentType, extractValue?: Function) {
  return function (
    field?: string | z.ZodSchema | Constructable,
    schema?: z.ZodSchema | Constructable,
  ): ParameterDecorator {
    return function (target: object, prop: MetadataKey | undefined, index: number) {
      const argsMeta = appMetadata.getOwnMetadataMap<MetadataKey, RouteHandlerArgumentMetaDecorator[]>(
        SymbolRouteHandlersArgumentsMeta,
        target.constructor,
      );

      const hasParamField = typeof field === 'string';
      const paramField = hasParamField ? field : undefined;
      const paramSchema = hasParamField ? schema : field;

      if (!argsMeta[prop!]) argsMeta[prop!] = [];
      argsMeta[prop!].push({
        index,
        type: paramType,
        field: paramField,
        pipes: paramSchema,
        extractValue,
      });
    };
  };
}
