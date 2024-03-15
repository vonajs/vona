import { IModelSelectParamsJoin } from 'cabloy-module-api-a-database';
import { FlowNodeStartEventAtomCondition } from './flow.node.startEventAtom_condition.js';

export class FlowNodeStartEventAtomMatch extends FlowNodeStartEventAtomCondition {
  async _getAllConditions({ atomClassId, needFlowContent }: any) {
    // order by atomStatic/conditionExpression
    const columns = ['a.*', 'c.atomName', 'c.atomStaticKey'];
    const joins: IModelSelectParamsJoin[] = [
      ['innerJoin', 'aFlowDef as b', { 'a.flowDefId': 'b.atomId' }],
      ['innerJoin', 'aAtom as c', { 'b.atomId': 'c.id' }],
    ];
    const where = {
      'a.atomClassId': atomClassId,
    };
    if (needFlowContent) {
      columns.push('b2.content');
      joins.push(['innerJoin', 'aFlowDefContent as b2', { 'b.atomId': 'b2.atomId' }]);
    }
    const list = await this.bean.model.select('aFlowNodeStartEventAtomCondition as a', {
      columns,
      joins,
      where,
      orders: [
        ['c.atomStatic', 'asc'],
        ['a.conditionExpression', 'desc'],
      ],
    });
    return list;
  }

  async _match({ atom, userId }: any) {
    const list = await this._getAllConditions({ atomClassId: atom.atomClassId });
    for (const _condition of list) {
      const flowInstance = await this._matchCondition({ _condition, atom, userId });
      if (flowInstance) return flowInstance;
    }
    return null;
  }

  async _matchCondition(context) {
    const { _condition, atom, userId } = context;
    // check if valid
    if (!(await this._checkConditionValid(context))) {
      await this._deleteCondition(context);
      return null;
    }
    // match conditionExpression
    const conditionActive = _condition.conditionExpression;
    if (conditionActive) {
      const res = this.ctx.bean.flow.evaluateExpression({
        expression: conditionActive,
        globals: { atom },
      });
      if (!res) return null;
    }
    // start
    const flowInstance = await this.ctx.bean.flow.startById({
      flowDefId: _condition.flowDefId,
      startEventId: _condition.startEventId,
      flowUserId: userId,
      flowAtomId: atom.atomId,
      flowAtomClassId: atom.atomClassId,
    });
    // ok
    return flowInstance;
  }

  async _checkConditionValid(context) {
    const { _condition } = context;
    // flowDef
    const flowDef = await this.ctx.bean.flowDef.getById({ flowDefId: _condition.flowDefId });
    if (!flowDef) return false;
    // atomDisabled
    if (flowDef.atomDisabled === 1) return false;
    // content
    const content = flowDef.content ? JSON.parse(flowDef.content) : null;
    if (!content) return false;
    const nodeConfig = content.process.nodes.find(item => item.id === _condition.startEventId);
    if (!nodeConfig) return false;
    // check if changed
    const conditionActive = _condition.conditionExpression;
    const conditionConfig = nodeConfig.options && nodeConfig.options.conditionExpression;
    if (conditionActive !== conditionConfig) return false;
    // ok
    return true;
  }
}
