mport { BeanBase } from 'vona';
import { Controller } from 'vona-module-a-web';

@Controller()
export class ControllerFlowDef extends BeanBase {
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
