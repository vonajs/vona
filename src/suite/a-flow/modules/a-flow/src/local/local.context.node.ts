import { Bean, BeanBase } from '@cabloy/core';

@Bean({ scene: 'local.context' })
export class LocalContextNode extends BeanBase {
  // contextEdge maybe null
  context: any;
  contextEdge: any;
  _nodeDef: any;
  _flowNodeId: any;
  _flowNode: any;
  _flowNodeHistory: any;
  _nodeVars: any;
  _utils: any;

  constructor({ context, contextEdge, nodeDef }) {
    super();
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
