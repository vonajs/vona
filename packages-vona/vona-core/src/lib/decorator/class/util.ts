import type { IDecoratorBeanInfoOptions } from '../interface/beanOptions.ts';
import type { Constructable } from '../type/constructable.ts';
import { parseModuleName as _parseModuleName, ParseModuleNameLevelInit } from '@cabloy/module-info-pro';
import { appMetadata } from '../../core/metadata.ts';
import { DecoratorBeanInfo } from '../../core/resource.ts';

export const ParseModuleNameLevel = ParseModuleNameLevelInit + 5;

export function parseModuleName(beanClass: Constructable) {
  // beanInfo
  const beanInfo = appMetadata.getMetadata<IDecoratorBeanInfoOptions>(DecoratorBeanInfo, beanClass);
  return beanInfo?.module || _parseModuleName(ParseModuleNameLevel);
}
