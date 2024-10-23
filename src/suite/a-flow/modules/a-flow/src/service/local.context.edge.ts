import { LocalContextFlow } from './local.context.flow.js';
import { LocalContextNode } from './local.context.node.js';

// not extends BeanBase
export class LocalContextEdge {
  context: LocalContextFlow;
  contextNode: LocalContextNode;
  _edgeDef: any;
  _utils: any;

  constructor({ context, contextNode, edgeDef }: any) {
    this.context = context;
    this.contextNode = contextNode;
    this._edgeDef = edgeDef;
    //
    this._utils = null;
  }

  get utils() {
    return this._utils;
  }
}
