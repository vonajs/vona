import { BeanBase, Controller } from 'vona';
import { ScopeModule } from '../resource/this.js';

@Controller()
export class ControllerFlowDef extends BeanBase<ScopeModule> {
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
