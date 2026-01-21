import type { IOpenApiOptionsResourceMeta } from 'vona-module-a-openapi';
import type { IOpenApiOptions } from '../../types/api.ts';
import { appMetadata } from 'vona';
import { SymbolControllerResource, SymbolOpenApiOptions } from '../const/decorator.ts';

export function Resource(resourceMeta?: IOpenApiOptionsResourceMeta): ClassDecorator {
  return function (target: object) {
    // IOpenApiOptions
    const optionsMeta = appMetadata.getOwnMetadataMap(false, SymbolOpenApiOptions, target) as IOpenApiOptions;
    optionsMeta.resourceMeta = resourceMeta;
    // controller resource
    appMetadata.defineMetadata(SymbolControllerResource, true, target);
  };
}
