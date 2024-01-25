import FlowNodeStartEventAtom0 from './flow.node.startEventAtom_0.js';

export class FlowNodeStartEventAtomCondition extends FlowNodeStartEventAtom0 {
  async _deploy_condition({ atomClass, deploy, flowDefId, node }) {
    if (deploy) {
      await this._addCondition({ atomClass, flowDefId, node });
    } else {
      await this._deleteCondition2({ flowDefId, node });
    }
  }

  async _getAtomClass({ flowDefId, node }) {
    const atom = node.options && node.options.atom;
    if (!atom || !atom.module || !atom.atomClassName) {
      // donot delete condition
      // throw error
      throw new Error(`atom not set for startEventAtom: ${flowDefId}.${node.id}`);
    }
    // atomClass
    const atomClass = await this.ctx.bean.atomClass.get({
      module: atom.module,
      atomClassName: atom.atomClassName,
    });
    // ok
    return { atomClass };
  }

  async _addCondition({ atomClass, flowDefId, node }) {
    // conditionExpression
    const conditionExpression = node.options.conditionExpression;
    // get condition
    const startEventId = node.id;
    const _condition = await this.modelCondition.get({
      flowDefId,
      startEventId,
    });
    if (_condition) {
      // update
      _condition.atomClassId = atomClass.id;
      _condition.conditionExpression = conditionExpression;
      await this.modelCondition.update(_condition);
    } else {
      // insert
      await this.modelCondition.insert({
        flowDefId,
        startEventId,
        atomClassId: atomClass.id,
        conditionExpression,
      });
    }
  }

  async _deleteCondition(context) {
    const { _condition } = context;
    await this.modelCondition.delete({ id: _condition.id });
  }

  async _deleteCondition2({ flowDefId, node }) {
    const startEventId = node.id;
    await this.modelCondition.delete({
      flowDefId,
      startEventId,
    });
  }
}
