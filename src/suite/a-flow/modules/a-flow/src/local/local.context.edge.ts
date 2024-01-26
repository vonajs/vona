import { Bean, BeanBase } from '@cabloy/core';

@Bean({ scene: 'local.context' })
export class LocalContextEdge extends BeanBase {
  constructor({ context, contextNode, edgeDef }) {
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
