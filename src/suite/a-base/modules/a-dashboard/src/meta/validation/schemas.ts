import { __ThisModule__ } from '../../resource/this.js';

const schemas = {};
// dashboard
schemas.dashboard = {
  type: 'object',
  properties: {
    atomName: {
      type: 'string',
      ebType: 'text',
      ebTitle: 'Name',
      notEmpty: true,
    },
    atomStaticKey: {
      type: 'string',
      ebType: 'text',
      ebTitle: 'KeyForAtom',
      ebReadOnly: true,
      notEmpty: true,
    },
    description: {
      type: 'string',
      ebType: 'text',
      ebTitle: 'Description',
    },
    content: {
      type: 'string',
      ebType: 'component',
      ebTitle: 'Content',
      ebRender: {
        module: __ThisModule__,
        name: 'renderDashboardContent',
      },
      notEmpty: true,
    },
  },
};
// dashboard search
schemas.dashboardSearch = {
  type: 'object',
  properties: {
    description: {
      type: 'string',
      ebType: 'text',
      ebTitle: 'Description',
    },
  },
};
export default schemas;
