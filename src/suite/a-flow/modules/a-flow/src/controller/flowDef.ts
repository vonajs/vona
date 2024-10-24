import { BeanBase, Controller } from 'vona';
import { ScopeModule } from '../.metadata/this.js';

@Controller()
export class ControllerFlowDef extends BeanBase<ScopeModule> {
  behaviorBases() {
    const res = this.scope.service.flowDef.behaviorBases();
    this.ctx.success(res);
  }

  nodeBases() {
    const res = this.scope.service.flowDef.nodeBases();
    this.ctx.success(res);
  }

  edgeBases() {
    const res = this.scope.service.flowDef.edgeBases();
    this.ctx.success(res);
  }

  flowServiceBases() {
    const res = this.scope.service.flowDef.flowServiceBases();
    this.ctx.success(res);
  }
}
