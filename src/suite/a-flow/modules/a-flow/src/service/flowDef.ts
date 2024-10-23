import { BeanBase, Service } from 'vona';

@Service()
export class ServiceFlowDef extends BeanBase {
  behaviorBases() {
    return this.ctx.bean.flowDef.behaviorBases();
  }

  nodeBases() {
    return this.ctx.bean.flowDef.nodeBases();
  }

  edgeBases() {
    return this.ctx.bean.flowDef.edgeBases();
  }

  flowServiceBases() {
    return this.ctx.bean.flowDef.flowServiceBases();
  }
}
