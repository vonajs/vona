// const moduleInfo = module.info;
module.exports = class FlowTask {
  // mode: read/write view/edit
  // atomClass: detail/main
  async _prepareAtomSchema({ mode, flowTaskId, atomClass, user, throwError }) {
    // read
    const modeRead = mode === 'view' || mode === 'read';
    // taskInstance
    const history = modeRead;
    const taskInstance = await this._loadTaskInstance({ flowTaskId, user, history, throwError });
    if (!taskInstance) return null;
    // specificFlag
    const specificFlag = taskInstance.contextTask._flowTaskHistory.specificFlag;
    if ((specificFlag === 1 || specificFlag === 2) && !modeRead) {
      // not allowed to write
      return null;
    }
    // fieldsRight
    //   specificFlag：1/2
    //     1. for safety check, always try to get fieldsRight
    //     2. then get previous node's fieldsRight of mode:view
    let fieldsRight = await taskInstance._getFieldsRightSafe({ mode });

    if (specificFlag === 1 || specificFlag === 2) {
      // assignees/recall
      const nodeInstancePrevious = await taskInstance.nodeInstance._loadNodeInstancePrevious();
      fieldsRight = await nodeInstancePrevious._getFieldsRight();
    }
    // schema
    const schema = await this.ctx.bean.fields.parseSchema({
      atomClass, // detail/main
      fieldsRight,
    });
    return { taskInstance, fieldsRight, schema, item: taskInstance.context.atom };
  }
};
