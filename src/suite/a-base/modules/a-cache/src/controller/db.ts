import { BeanBase, Controller, Use } from '@cabloy/core';
import { ScopeModuleACache } from '../index.js';

@Controller()
export class ControllerDb extends BeanBase {
  @Use()
  scope: ScopeModuleACache;
}
