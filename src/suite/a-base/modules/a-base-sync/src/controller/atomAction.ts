import { BeanBase, Controller, Use } from '@cabloy/core';
import { ScopeModuleABase } from '../index.js';

@Controller()
export class ControllerAtomAction extends BeanBase {
  @Use()
  scope: ScopeModuleABase;
}
