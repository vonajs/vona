import { Bean, BeanBase } from '@cabloy/core';

@Bean({ scene: 'local.context' })
export class LocalContextEdge extends BeanBase {
  context: any;
  contextNode: any;
  _edgeDef: any;
  _utils: any;

  constructor({ context, contextNode, edgeDef }) {
    super();
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
