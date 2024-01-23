import { BeanBase, Controller, Use } from '@cabloy/core';
import { ScopeModuleAStatus } from '../index.js';

@Controller()
export class ControllerStatus extends BeanBase {
  @Use()
  scope: ScopeModuleAStatus;
}
