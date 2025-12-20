import type { Constructable } from 'vona';
import type { IOpenApiOptions } from 'vona-module-a-openapiutils';
import type { IDecoratorControllerOptions } from '../../types/controller.ts';
import type { IDecoratorDtoOptions } from '../../types/dto.ts';
import { combineApiPathControllerAndAction, combineApiPathControllerAndActionRaw } from '@cabloy/utils';
import { appMetadata, appResource, cast, createBeanDecorator, deepExtend, onionNameFromBeanFullName } from 'vona';
import { mergeFieldsOpenapiMetadata } from 'vona-module-a-openapiutils';
import { SymbolOpenApiOptions } from 'vona-module-a-openapiutils';
import { recordResourceNameToRoutePath, SymbolControllerOptionsResource } from '../const.ts';

export function Controller<T extends IDecoratorControllerOptions>(options?: T): ClassDecorator;
export function Controller<T extends IDecoratorControllerOptions>(path?: string, options?: Omit<T, 'path'>): ClassDecorator;
export function Controller<T extends IDecoratorControllerOptions>(path?: T | string, options?: T | string): ClassDecorator {
  if (typeof path === 'string') {
    options = Object.assign({}, options, { path });
  } else {
    options = path || {} as any;
  }
  return createBeanDecorator('controller', options, false, target => {
    // beanOptions
    const beanOptions = appResource.getBean(target)!;
    // IOpenApiOptions
    const optionsMeta = appMetadata.getOwnMetadataMap(false, SymbolOpenApiOptions, target) as IOpenApiOptions;
    for (const key of ['exclude', 'tags']) {
      const option = cast(beanOptions.options)[key];
      if (option !== undefined) optionsMeta[key] = option;
    }
    // IOpenApiOptions
    mergeActionsOpenapiMetadata(target);
    // map: resourceName->api path
    const optionsResource = appMetadata.getOwnMetadata(SymbolControllerOptionsResource, target);
    if (optionsResource) {
      const routePath = combineApiPathControllerAndAction(beanOptions.module, cast(beanOptions.options).path, undefined, false, true);
      const routePathRaw = combineApiPathControllerAndActionRaw(beanOptions.module, cast(beanOptions.options).path, undefined, true);
      recordResourceNameToRoutePath[onionNameFromBeanFullName(beanOptions.beanFullName)] = { routePath, routePathRaw };
    }
  });
}

export function Dto<T extends IDecoratorDtoOptions<any>>(options?: T): ClassDecorator {
  return createBeanDecorator('dto', options, false, target => {
    mergeFieldsOpenapiMetadata(target);
  });
}

export function mergeActionsOpenapiMetadata(target: Constructable) {
  // beanOptions
  const beanOptions = appResource.getBean(target);
  const actions = cast(beanOptions?.options)?.actions;
  if (!actions) return;
  for (const key in actions) {
    const action: IOpenApiOptions = actions[key];
    if (!action) continue;
    const options = appMetadata.getOwnMetadataMap(false, SymbolOpenApiOptions, target.prototype, key) as IOpenApiOptions;
    deepExtend(options, action);
  }
}
