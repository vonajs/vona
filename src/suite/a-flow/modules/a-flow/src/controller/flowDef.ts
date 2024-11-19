import { BeanBase, Controller } from 'vona';
import { ScopeModule } from '../.metadata/this.js';

@Controller()
export class ControllerFlowDef extends BeanBase<ScopeModule> {
  behaviorBases() {
    const res = this.scope.service.flowDef.behaviorBases();
    this.app.success(res);
  }

  nodeBases() {
    const res = this.scope.service.flowDef.nodeBases();
    this.app.success(res);
  }

  edgeBases() {
    const res = this.scope.service.flowDef.edgeBases();
    this.app.success(res);
  }

  flowServiceBases() {
    const res = this.scope.service.flowDef.flowServiceBases();
    this.app.success(res);
  }
}
