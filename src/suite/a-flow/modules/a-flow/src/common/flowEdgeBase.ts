import { BeanBase } from 'vona';

export class BeanFlowEdgeBase extends BeanBase {
  flowInstance: any;
  edgeInstance: any;
  context: any;
  contextNode: any;
  contextEdge: any;

  protected __init__(options) {
    if (options) {
      this.flowInstance = options.flowInstance;
      this.edgeInstance = options.edgeInstance;
      this.context = options.context;
      this.contextNode = options.contextNode;
      this.contextEdge = options.contextEdge;
    }
  }

  async onEdgeEnter() {
    await this.flowInstance._flowListener.onEdgeEnter(this.contextEdge, this.contextNode);
    return true;
  }

  async onEdgeTake() {
    await this.flowInstance._flowListener.onEdgeTake(this.contextEdge, this.contextNode);
    return true;
  }

  async onEdgeLeave() {
    await this.flowInstance._flowListener.onEdgeLeave(this.contextEdge, this.contextNode);
    return true;
  }
}
