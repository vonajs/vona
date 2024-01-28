import { BeanBase, Controller, Use } from '@cabloy/core';
import { ScopeModule } from '../resource/this.js';

@Controller()
export class ControllerDb extends BeanBase<ScopeModule> {}
