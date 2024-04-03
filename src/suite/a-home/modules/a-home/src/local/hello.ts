import { BeanBase, Local } from '@cabloy/core';
import { ScopeModule } from '../resource/this.js';

@Local()
export class LocalHello extends BeanBase<ScopeModule> {
  async action({ user }) {
    return user;
  }
}
