import { BeanFlowTaskSchema } from './bean.flowTask_schema.js';

export class BeanFlowTaskCheckViewWorkflow extends BeanFlowTaskSchema {
  async _checkViewWorkflow({ flowId, user }: any) {
    // 1. check atomClass action
    let res = await this._checkViewWorkflow_checkRightAction({ flowId, user });
    if (res) return true;
    // 2. check task option: allowViewWorkflow
    res = await this._checkViewWorkflow_checkTaskOptions({ flowId, user });
    return res;
  }

  async _checkViewWorkflow_checkRightAction({ flowId, user }: any) {
    // flow
    const flowItem = await this.app.bean.flow.modelFlowHistory.get({ flowId });
    if (!flowItem) return false;
    const atomId = flowItem.flowAtomId;
    const atomClassId = flowItem.flowAtomClassId;
    if (!atomId) return false;
    // check atomClass action
    const res = await this.app.bean.atom.checkRightAction({
      atom: { id: atomId },
      atomClass: { id: atomClassId },
      action: 'viewWorkflow',
      user,
    });
    return !!res;
  }

  async _checkViewWorkflow_checkTaskOptions({ flowId, user }: any) {
    // check task option: allowViewWorkflow
    const items = await this.modelFlowTaskHistory.select({
      where: {
        flowId,
        userIdAssignee: user.id,
        allowViewWorkflow: 1,
      },
      limit: 1,
      offset: 0,
    });
    return items.length > 0;
  }
}
