import type { IOpenApiOptions } from 'vona-module-a-openapi';
import type { IDecoratorControllerOptions } from '../../types/controller.ts';
import type { IDecoratorDtoOptions } from '../../types/dto.ts';
import { appMetadata, createBeanDecorator } from 'vona';
import { mergeFieldsOpenAPIMetadata, SymbolOpenApiOptions } from 'vona-module-a-openapi';

export function Controller<T extends IDecoratorControllerOptions>(options?: T): ClassDecorator;
export function Controller<T extends IDecoratorControllerOptions>(path?: string, options?: Omit<T, 'path'>): ClassDecorator;
export function Controller<T extends IDecoratorControllerOptions>(path?: T | string, options?: T | string): ClassDecorator {
  if (typeof path === 'string') {
    options = Object.assign({}, options, { path });
  } else {
    options = path || {} as any;
  }
  return createBeanDecorator('controller', options, false, false, target => {
    const optionsMeta = appMetadata.getOwnMetadataMap(false, SymbolOpenApiOptions, target) as IOpenApiOptions;
    for (const key of ['exclude', 'tags']) {
      if (options![key] !== undefined) optionsMeta[key] = options![key];
    }
  });
}

export function Service(): ClassDecorator {
  return createBeanDecorator('service');
}

export function Dto<T extends IDecoratorDtoOptions<any>>(options?: T): ClassDecorator {
  return createBeanDecorator('dto', options, false, false, target => {
    mergeFieldsOpenAPIMetadata(target);
  });
}
