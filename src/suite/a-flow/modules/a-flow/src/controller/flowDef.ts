import { BeanBase, Controller, Use } from '@cabloy/core';
import { ScopeModuleAFlow } from '../index.js';

@Controller()
export class ControllerFlowDef extends BeanBase {
  behaviorBases() {
    const res = this.ctx.service.flowDef.behaviorBases();
    this.ctx.success(res);
  }

  nodeBases() {
    const res = this.ctx.service.flowDef.nodeBases();
    this.ctx.success(res);
  }

  edgeBases() {
    const res = this.ctx.service.flowDef.edgeBases();
    this.ctx.success(res);
  }

  flowServiceBases() {
    const res = this.ctx.service.flowDef.flowServiceBases();
    this.ctx.success(res);
  }
}
