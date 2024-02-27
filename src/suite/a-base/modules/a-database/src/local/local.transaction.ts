import { BeanBase, Local } from '@cabloy/core';
import { ScopeModule } from '../resource/this.js';

@Local()
export class LocalTransaction extends BeanBase<ScopeModule> {}
