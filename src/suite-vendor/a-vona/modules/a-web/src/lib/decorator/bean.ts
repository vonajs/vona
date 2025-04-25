import type { IOpenApiOptions } from 'vona-module-a-openapi';
import type { IDecoratorControllerOptions } from '../../types/controller.ts';
import type { IDecoratorDtoOptions } from '../../types/dto.ts';
import { appMetadata, createBeanDecorator } from 'vona';
import { getTargetDecoratorRules, SymbolOpenApiOptions } from 'vona-module-a-openapi';

export function Controller(options?: IDecoratorControllerOptions): ClassDecorator;
export function Controller(path?: string): ClassDecorator;
export function Controller(options?: IDecoratorControllerOptions | string): ClassDecorator {
  if (!options) options = {};
  if (typeof options === 'string') {
    options = { path: options } as unknown as IDecoratorControllerOptions;
  }
  return createBeanDecorator('controller', options, false, false, target => {
    const optionsMeta = appMetadata.getOwnMetadataMap(false, SymbolOpenApiOptions, target) as IOpenApiOptions;
    for (const key of ['exclude', 'tags']) {
      if (options[key] !== undefined) optionsMeta[key] = options[key];
    }
  });
}

export function Service(): ClassDecorator {
  return createBeanDecorator('service');
}

export function Dto(options?: IDecoratorDtoOptions): ClassDecorator {
  return createBeanDecorator('dto', options, false, false, target => {
    // rules
    getTargetDecoratorRules(target);
  });
}
