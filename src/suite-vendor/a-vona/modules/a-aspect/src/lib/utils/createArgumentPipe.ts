import type { MetadataKey } from 'vona';
import type { RouteHandlerArgumentMetaDecorator } from 'vona-module-a-openapi';
import type { IPipeRecord } from '../../types/pipe.ts';
import { isNil } from '@cabloy/utils';
import { appMetadata } from 'vona';
import { SymbolRouteHandlersArgumentsMeta } from 'vona-module-a-openapi';

export interface ArgumentPipeInfo<T extends keyof IPipeRecord> {
  pipeName: T;
  options?: Partial<IPipeRecord[T]>;
}

export function createArgumentPipeInfo<T extends keyof IPipeRecord>(
  pipeName: T,
  options?: Partial<IPipeRecord[T]>,
): ArgumentPipeInfo<T> {
  return {
    pipeName,
    options,
  };
}

export function createArgumentPipe<T extends keyof IPipeRecord>(pipeName: T) {
  return function (options?: Partial<IPipeRecord[T]>): any {
    return function (target: object, prop: MetadataKey | undefined, index: number) {
      // not inherit
      const argsMeta = appMetadata.getOwnMetadataArray<RouteHandlerArgumentMetaDecorator>(
        false,
        SymbolRouteHandlersArgumentsMeta,
        target,
        prop,
      );

      const argMeta = argsMeta[index];

      if (argMeta) {
        argMeta.pipes.push(() => {
          return createArgumentPipeInfo(pipeName, options);
        });
        if (!isNil(options?.type)) argMeta.type = options.type;
        if (!isNil(options?.field)) argMeta.field = options.field;
        if (!isNil(options?.schema)) argMeta.schema = options.schema;
        if (!isNil(options?.extractValue)) argMeta.extractValue = options.extractValue;
      } else {
        argsMeta[index] = {
          index,
          type: options?.type as any,
          field: options?.field,
          pipes: [() => {
            return createArgumentPipeInfo(pipeName, options);
          }],
          schema: options?.schema as any,
          extractValue: options?.extractValue,
        };
      }
    };
  };
}
