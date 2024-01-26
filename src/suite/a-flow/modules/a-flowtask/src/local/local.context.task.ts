import { Bean, BeanBase } from '@cabloy/core';

@Bean({ scene: 'local.context' })
export class LocalContextTask extends BeanBase {
  context: any;
  contextNode: any;
  _nodeDef: any;
  _flowTaskId: any;
  _flowTask: any;
  _flowTaskHistory: any;
  _taskVars: any;
  _utils: any;
  _user: any;

  constructor({ context, contextNode, nodeDef }) {
    this.context = context;
    this.contextNode = contextNode;
    this._nodeDef = nodeDef;
    //
    this._flowTaskId = null;
    this._flowTask = null;
    this._flowTaskHistory = null;
    this._taskVars = null;
    //
    this._utils = null;
    //
    this._user = null;
  }

  get vars() {
    return this._taskVars;
  }

  get utils() {
    return this._utils;
  }

  get user() {
    return this._user;
  }
}
