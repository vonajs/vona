import { BeanBase, Controller, Use } from '@cabloy/core';
import { ScopeModuleAUseronline } from '../index.js';

@Controller()
export class ControllerUserOnline extends BeanBase {
  @Use()
  scope: ScopeModuleAUseronline;
}
