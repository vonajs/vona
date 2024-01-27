const schemas: any = {};
// activityUserTask
schemas.activityUserTask = {
  type: 'object',
  properties: {
    atomStateTip: {
      type: 'string',
      ebType: 'text',
      ebTitle: 'AtomStateTip',
    },
    atomState: {
      type: 'number',
      ebType: 'component',
      ebTitle: 'AtomState',
      ebDisplay: {
        // use default atomState:1 for startEventAtom
        expression: '_meta.host.node.type!=="startEventAtom"',
      },
      ebRender: {
        module: 'a-flowchart',
        name: 'renderAtomState',
      },
    },
    assignees: {
      type: 'object',
      ebType: 'component',
      ebTitle: 'Assignees',
      ebRender: {
        module: 'a-flowchart',
        name: 'renderAssignees',
      },
      notEmpty: true,
    },
    showAssignees: {
      type: 'boolean',
      ebType: 'toggle',
      ebTitle: 'Show Assignees',
    },
    confirmation: {
      type: 'boolean',
      ebType: 'toggle',
      ebTitle: 'Confirmation Assignees',
    },
    confirmationAllowAppend: {
      type: 'boolean',
      ebType: 'toggle',
      ebTitle: 'ConfirmationAllowAppend',
    },
    bidding: {
      type: 'boolean',
      ebType: 'toggle',
      ebTitle: 'Bidding',
    },
    completionCondition: {
      type: 'object',
      ebType: 'json',
      ebTitle: 'Completion Condition',
      notEmpty: true,
    },
    rejectedNode: {
      type: 'string',
      ebType: 'component',
      ebTitle: 'Rejected Node',
      ebRender: {
        module: 'a-flowchart',
        name: 'renderRejectedNode',
      },
    },
    allowPassTask: {
      type: 'boolean',
      ebType: 'toggle',
      ebTitle: 'Allow Pass Task',
    },
    allowRejectTask: {
      type: 'boolean',
      ebType: 'toggle',
      ebTitle: 'Allow Reject Task',
    },
    allowCancelFlow: {
      type: 'boolean',
      ebType: 'toggle',
      ebTitle: 'Allow Cancel Flow',
    },
    allowRecall: {
      type: 'boolean',
      ebType: 'toggle',
      ebTitle: 'Allow Recall',
    },
    allowForward: {
      type: 'boolean',
      ebType: 'toggle',
      ebTitle: 'Allow Forward',
    },
    allowSubstitute: {
      type: 'boolean',
      ebType: 'toggle',
      ebTitle: 'Allow Substitute',
    },
    allowViewWorkflow: {
      type: 'boolean',
      ebType: 'toggle',
      ebTitle: 'AllowViewWorkflow',
    },
    fieldsRight: {
      type: 'object',
      ebType: 'component',
      ebTitle: 'FieldsRight',
      ebRender: {
        module: 'a-flowchart',
        name: 'renderFieldsRight',
      },
      notEmpty: true,
    },
    fieldsMapping: {
      type: 'object',
      ebType: 'json',
      ebTitle: 'Fields Mapping',
    },
  },
};
export default schemas;
