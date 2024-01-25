import FlowNodeStartEventAtomCondition from './flow.node.startEventAtom_condition.js';

export class FlowNodeStartEventAtomMatch extends FlowNodeStartEventAtomCondition {
  async _getAllConditions({ atomClassId, needFlowContent }) {
    const flowContentFields = needFlowContent ? ',b2.content' : '';
    const flowContentJoin = needFlowContent ? 'inner join aFlowDefContent b2 on b.atomId=b2.atomId' : '';
    // order by atomStatic/conditionExpression
    const list = await this.ctx.model.query(
      `
          select a.*,c.atomName,c.atomStaticKey${flowContentFields} from aFlowNodeStartEventAtomCondition a
            inner join aFlowDef b on a.flowDefId=b.atomId
            inner join aAtom c on b.atomId=c.id
            ${flowContentJoin}
            where a.iid=? and a.atomClassId=?
            order by c.atomStatic asc, a.conditionExpression desc
        `,
      [this.ctx.instance.id, atomClassId],
    );
    return list;
  }

  async _match({ atom, userId }) {
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
