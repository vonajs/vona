import { BeanBase } from 'vona';
import { Service } from 'vona-module-a-web';

import UtilsFn from '../common/utils.js';
import { LocalContextEdge } from '../common/local.context.edge.js';
import { LocalContextNode } from '../common/local.context.node.js';
import { LocalContextFlow } from '../common/local.context.flow.js';

@Service()
export class ServiceLocalFlowEdge extends BeanBase {
  flowInstance: any;
  context: LocalContextFlow;
  contextNode: LocalContextNode;
  contextEdge: LocalContextEdge;
  _edgeBase: any;
  _edgeBaseBean: any;

  protected __init__({ flowInstance, context, contextNode, edgeDef }: any) {
    this.flowInstance = flowInstance;
    this.context = context;
    this.contextNode = contextNode;
    this._edgeBase = null;
    this._edgeBaseBean = null;
    // context
    this.contextEdge = this.app.bean._newBean(LocalContextEdge, {
      context,
      contextNode,
      edgeDef,
    });
  }

  async init() {
    // context init
    await this._contextInit();
  }

  async _contextInit() {
    // utils
    this.contextEdge._utils = new (UtilsFn({ ctx: this.ctx, flowInstance: this.flowInstance }))({
      context: this.context,
      contextNode: this.contextNode,
      contextEdge: this.contextEdge,
    });
  }

  async _saveVars() {
    // save flowVars
    await this.flowInstance._saveFlowVars();
  }

  async enter() {
    // raise event: onEdgeEnter
    const res = await this.edgeBaseBean.onEdgeEnter();
    await this._saveVars();
    if (!res) return false;
    return await this.take();
  }

  async take() {
    // raise event: onEdgeTake
    const res = await this.edgeBaseBean.onEdgeTake();
    await this._saveVars();
    if (!res) return false;
    return await this.leave();
  }

  async leave() {
    // raise event: onEdgeLeave
    const res = await this.edgeBaseBean.onEdgeLeave();
    await this._saveVars();
    if (!res) return false;
    // next
    await this.flowInstance.nextNode({ contextEdge: this.contextEdge });
    // return true always, means the edge confirmed to be taken
    return true;
  }

  get edgeBaseBean() {
    if (!this._edgeBaseBean) {
      this._edgeBaseBean = this.app.bean._newBean(this.edgeBase.beanFullName, {
        flowInstance: this.flowInstance,
        edgeInstance: this,
        context: this.context,
        contextNode: this.contextNode,
        contextEdge: this.contextEdge,
      });
    }
    return this._edgeBaseBean;
  }

  get edgeBase() {
    if (!this._edgeBase) this._edgeBase = this.app.bean.flowDef._getFlowEdgeBase(this.contextEdge._edgeDef.type);
    return this._edgeBase;
  }
}
