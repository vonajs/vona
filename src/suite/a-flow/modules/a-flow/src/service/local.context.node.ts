import { LocalContextEdge } from './local.context.edge.js';
import { LocalContextFlow } from './local.context.flow.js';

// not extends BeanBase
export class LocalContextNode {
  // contextEdge maybe null
  context: LocalContextFlow;
  contextEdge: LocalContextEdge;
  _nodeDef: any;
  _flowNodeId: any;
  _flowNode: any;
  _flowNodeHistory: any;
  _nodeVars: any;
  _utils: any;

  constructor({ context, contextEdge, nodeDef }: any) {
    this.context = context;
    this.contextEdge = contextEdge;
    this._nodeDef = nodeDef;
    //
    this._flowNodeId = null;
    this._flowNode = null;
    this._flowNodeHistory = null;
    this._nodeVars = null;
    //
    this._utils = null;
  }

  get vars() {
    return this._nodeVars;
  }

  get utils() {
    return this._utils;
  }
}
