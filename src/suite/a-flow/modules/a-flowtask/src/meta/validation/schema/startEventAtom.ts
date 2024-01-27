const schemas: any = {};
// startEventAtom
schemas.startEventAtom = {
  type: 'object',
  properties: {
    atom: {
      type: 'object',
      ebType: 'atomClass',
      ebTitle: 'Atom Class',
      notEmpty: true,
      ebParams: {
        check: {
          itemOnly: false,
          simple: false,
        },
      },
    },
    conditionExpression: {
      type: 'string',
      ebType: 'text',
      ebTitle: 'Condition Expression',
      ebParams: {
        textarea: true,
      },
    },
    task: {
      type: 'object',
      ebType: 'panel',
      ebTitle: 'User Task Options',
      $ref: 'activityUserTask',
    },
  },
};
export default schemas;
