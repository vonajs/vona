import { appMetadata, isClassStrict, MetadataKey } from 'vona';
import { PipeArgument } from '../types/decorator.js';
import { schema } from '../schema/schema.js';
import { valid } from '../../bean/pipe.valid.js';
import {
  RouteHandlerArgumentMetaDecorator,
  RouteHandlerArgumentType,
  SymbolRouteHandlersArgumentsMeta,
} from 'vona-module-a-aspect';

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
      // default schema
      let argSchema = schema(metaType);
      // loop
      for (let index = paramPipes.length - 1; index >= 0; index--) {
        const paramPipe = paramPipes[index];
        if (!paramPipe) continue;
        if (paramPipe.parseAsync) {
          // schema
          argSchema = paramPipe;
        } else if (isClassStrict(paramPipe)) {
          // class
          argSchema = schema(paramPipe);
        } else {
          // function
          argSchema = paramPipe(argSchema);
        }
      }

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
