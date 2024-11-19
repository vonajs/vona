import { BeanBase, Service } from 'vona';

@Service()
export class ServiceFlowDef extends BeanBase {
  behaviorBases() {
    return this.app.bean.flowDef.behaviorBases();
  }

  nodeBases() {
    return this.app.bean.flowDef.nodeBases();
  }

  edgeBases() {
    return this.app.bean.flowDef.edgeBases();
  }

  flowServiceBases() {
    return this.app.bean.flowDef.flowServiceBases();
  }
}
