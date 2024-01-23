import { BeanBase, Controller, Use } from '@cabloy/core';
import { ScopeModuleAFlow } from '../index.js';

@Controller()
export class ControllerFlowDef extends BeanBase {
  @Use()
  scope: ScopeModuleAFlow;

  behaviorBases() {
    const res = this.scope.local.flowDef.behaviorBases();
    this.ctx.success(res);
  }

  nodeBases() {
    const res = this.scope.local.flowDef.nodeBases();
    this.ctx.success(res);
  }

  edgeBases() {
    const res = this.scope.local.flowDef.edgeBases();
    this.ctx.success(res);
  }

  flowServiceBases() {
    const res = this.scope.local.flowDef.flowServiceBases();
    this.ctx.success(res);
  }
}
