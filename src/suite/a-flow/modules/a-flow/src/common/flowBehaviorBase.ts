import { BeanBase } from '@cabloy/core';

export class BeanFlowBehaviorBase<T = unknown> extends BeanBase<T> {
  flowInstance: any;
  nodeInstance: any;
  context: any;
  contextNode: any;
  contextEdge: any;
  _behaviorDef: any;
  _behaviorBase: any;

  protected __init__(options) {
    if (options) {
      this.flowInstance = options.flowInstance;
      this.nodeInstance = options.nodeInstance;
      this.context = options.context;
      this.contextNode = options.contextNode;
      this.contextEdge = options.contextEdge;
      this._behaviorDef = options.behaviorDef;
      this._behaviorBase = options.behaviorBase;
    }
  }

  getBehaviorDefOptions(_context, next) {
    return next();
  }

  getNodeDefOptions(_context, next) {
    return next();
  }

  async enter(_context, next) {
    return await next();
  }

  async begin(_context, next) {
    return await next();
  }

  async doing(_context, next) {
    return await next();
  }

  async end(_context, next) {
    return await next();
  }

  async leave(_context, next) {
    return await next();
  }

  async clear(_context, next) {
    return await next();
  }

  async change(_context, next) {
    return await next();
  }
}
