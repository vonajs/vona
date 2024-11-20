import { BeanFlowDefDeploy } from './bean.flowDef_deploy.js';

const __flowBehaviorBases: any = {};
const __flowNodeBases: any = {};
const __flowEdgeBases: any = {};
const __flowServiceBases: any = {};

export class BeanFlowDefPrepare extends BeanFlowDefDeploy {
  behaviorBases() {
    return this._getFlowBehaviorBases();
  }

  nodeBases() {
    return this._getFlowNodeBases();
  }

  edgeBases() {
    return this._getFlowEdgeBases();
  }

  flowServiceBases() {
    return this._getFlowServiceBases();
  }

  _getFlowServiceBases() {
    if (!__flowServiceBases[this.ctx.locale]) {
      __flowServiceBases[this.ctx.locale] = this._prepareFlowServiceBases();
    }
    return __flowServiceBases[this.ctx.locale];
  }

  _getFlowServiceBase(service) {
    return this._getFlowServiceBases()[service.module][service.name];
  }

  _getFlowBehaviorBases() {
    if (!__flowBehaviorBases[this.ctx.locale]) {
      __flowBehaviorBases[this.ctx.locale] = this._prepareFlowBehaviorBases();
    }
    return __flowBehaviorBases[this.ctx.locale];
  }

  _getFlowBehaviorBase(behaviorType) {
    return this._getFlowBehaviorBases()[behaviorType];
  }

  _getFlowNodeBases() {
    if (!__flowNodeBases[this.ctx.locale]) {
      __flowNodeBases[this.ctx.locale] = this._prepareFlowNodeBases();
    }
    return __flowNodeBases[this.ctx.locale];
  }

  _getFlowNodeBase(nodeType) {
    return this._getFlowNodeBases()[nodeType];
  }

  _prepareFlowServiceBases() {
    const flowServiceBases: any = {};
    for (const module of this.ctx.app.meta.modulesArray) {
      const services = module.meta && module.meta.flow && module.meta.flow.services;
      if (!services) continue;
      const relativeName = module.info.relativeName;
      for (const key in services) {
        const service = services[key];
        const beanFullName = this.bean.util.combineBeanFullName({
          module: relativeName,
          scene: 'flow.service',
          bean: service.bean,
        });
        // group by module
        if (!flowServiceBases[relativeName]) {
          flowServiceBases[relativeName] = {};
        }
        // hold
        flowServiceBases[relativeName][key] = {
          ...service,
          beanFullName,
          titleLocale: this.app.text(service.title),
        };
      }
    }
    return flowServiceBases;
  }

  _prepareFlowBehaviorBases() {
    const flowBehaviorBases: any = {};
    for (const module of this.ctx.app.meta.modulesArray) {
      const behaviors = module.meta && module.meta.flow && module.meta.flow.behaviors;
      if (!behaviors) continue;
      for (const key in behaviors) {
        const behavior = behaviors[key];
        const beanFullName = this.bean.util.combineBeanFullName({
          module: module.info.relativeName,
          scene: 'flow.behavior',
          bean: behavior.bean,
        });
        // support fullKey and key
        const fullKey = `${module.info.relativeName}:${key}`;
        flowBehaviorBases[fullKey] = flowBehaviorBases[key] = {
          ...behavior,
          beanFullName,
          titleLocale: this.app.text(behavior.title),
        };
      }
    }
    return flowBehaviorBases;
  }

  _prepareFlowNodeBases() {
    const flowNodeBases: any = {};
    for (const module of this.ctx.app.meta.modulesArray) {
      const nodes = module.meta && module.meta.flow && module.meta.flow.nodes;
      if (!nodes) continue;
      for (const key in nodes) {
        const node = nodes[key];
        const beanFullName = this.bean.util.combineBeanFullName({
          module: module.info.relativeName,
          scene: 'flow.node',
          bean: node.bean,
        });
        // support fullKey and key
        const fullKey = `${module.info.relativeName}:${key}`;
        flowNodeBases[fullKey] = flowNodeBases[key] = {
          ...node,
          beanFullName,
          titleLocale: this.app.text(node.title),
        };
      }
    }
    return flowNodeBases;
  }

  _getFlowEdgeBases() {
    if (!__flowEdgeBases[this.ctx.locale]) {
      __flowEdgeBases[this.ctx.locale] = this._prepareFlowEdgeBases();
    }
    return __flowEdgeBases[this.ctx.locale];
  }

  _getFlowEdgeBase(edgeType = 'sequence') {
    return this._getFlowEdgeBases()[edgeType];
  }

  _prepareFlowEdgeBases() {
    const flowEdgeBases: any = {};
    for (const module of this.ctx.app.meta.modulesArray) {
      const edges = module.meta && module.meta.flow && module.meta.flow.edges;
      if (!edges) continue;
      for (const key in edges) {
        const edge = edges[key];
        const beanFullName = this.bean.util.combineBeanFullName({
          module: module.info.relativeName,
          scene: 'flow.edge',
          bean: edge.bean,
        });
        // support fullKey and key
        const fullKey = `${module.info.relativeName}:${key}`;
        flowEdgeBases[fullKey] = flowEdgeBases[key] = {
          ...edge,
          beanFullName,
          titleLocale: this.app.text(edge.title),
        };
      }
    }
    return flowEdgeBases;
  }

  _combineFullKey({ flowDefKey }: any) {
    let fullKey;
    let dynamic;
    if (typeof flowDefKey === 'string') {
      dynamic = 1;
      fullKey = flowDefKey;
    } else {
      dynamic = 0;
      fullKey = `${flowDefKey.module}:${flowDefKey.name}`;
    }
    return { fullKey, dynamic };
  }
}
