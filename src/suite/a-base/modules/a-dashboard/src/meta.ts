import schemas from './meta/validation/schemas.js';
import staticDashboards from './meta/static/dashboards.js';
import staticResources from './meta/static/resources.js';
export const meta = {
  base: {
    atoms: {
      dashboard: {
        info: {
          bean: 'dashboard',
          title: 'Dashboard',
          tableName: 'aDashboard',
          tableNameModes: {
            full: 'aDashboardViewFull',
          },
          inner: true,
          resource: true,
          comment: false,
          attachment: false,
        },
        actions: {
          write: {
            enableOnStatic: null,
          },
        },
        validator: 'dashboard',
        search: {
          validator: 'dashboardSearch',
        },
      },
    },
    resources: {
      widget: {
        title: 'Dashboard Widget',
      },
    },
    statics: {
      'a-dashboard.dashboard': {
        items: staticDashboards,
      },
      'a-base.resource': {
        items: staticResources,
      },
    },
  },
  sequence: {
    providers: {
      dashboard: {
        bean: {
          module: 'a-sequence',
          name: 'simple',
        },
        start: 0,
      },
    },
  },
  validation: {
    validators: {},
    keywords: {},
    schemas,
  },
};
