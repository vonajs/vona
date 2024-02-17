import { BeanBase } from '@cabloy/core';

export class BeanFlowNodeBase extends BeanBase {
  flowInstance: any;
  nodeInstance: any;
  context: any;
  contextNode: any;
  contextEdge: any;

  constructor() {
    super();
  }

  protected __init__(options) {
    if (options) {
      this.flowInstance = options.flowInstance;
      this.nodeInstance = options.nodeInstance;
      this.context = options.context;
      this.contextNode = options.contextNode;
      this.contextEdge = options.contextEdge;
    }
  }

  getBehaviorDefOptions({ behaviorDefId, options }: any) {
    return this.flowInstance._flowListener.getBehaviorDefOptions(this.contextNode, { behaviorDefId, options });
  }

  getNodeDefOptions({ options }: any) {
    return this.flowInstance._flowListener.getNodeDefOptions(this.contextNode, { options });
  }

  async onNodeEnter() {
    const res = await this.flowInstance._flowListener.onNodeEnter(this.contextNode);
    if (res === false) return false;
    return true;
  }

  async onNodeBegin() {
    const res = await this.flowInstance._flowListener.onNodeBegin(this.contextNode);
    if (res === false) return false;
    return true;
  }

  async onNodeDoing() {
    const res = await this.flowInstance._flowListener.onNodeDoing(this.contextNode);
    if (res === false) return false;
    return true;
  }

  async onNodeEnd() {
    const res = await this.flowInstance._flowListener.onNodeEnd(this.contextNode);
    if (res === false) return false;
    return true;
  }

  async onNodeLeave() {
    const res = await this.flowInstance._flowListener.onNodeLeave(this.contextNode);
    if (res === false) return false;
    return true;
  }

  async onNodeClear({ options }: any) {
    const res = await this.flowInstance._flowListener.onNodeClear(this.contextNode, { options });
    if (res === false) return false;
    return true;
  }

  async onNodeChange({ options: _options }: any) {
    // should not raise onNodeChange for flowListener
    // await this.flowInstance._flowListener.onNodeChange(this.contextNode, { options });
    return true;
  }
}
