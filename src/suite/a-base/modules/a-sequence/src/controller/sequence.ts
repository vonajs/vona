import { BeanBase, Controller, Use } from '@cabloy/core';
import { ScopeModuleASequence } from '../index.js';

@Controller()
export class ControllerSequence extends BeanBase {
  @Use()
  scope: ScopeModuleASequence;
}
