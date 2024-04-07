import atomClasses from './meta/atomClass/atomClasses.js';
import keywords from './meta/validation/keywords.js';
import schemas from './meta/validation/schemas.js';
import staticApps from './meta/static/apps.js';
import staticFlowDefs from './meta/static/flowDefs.js';
import staticLayouts from './meta/static/layouts.js';
import staticResources from './meta/static/resources.js';
import staticProducts from './meta/static/products.js';
import staticDicts from './meta/static/dicts.js';
import flowServices from './meta/flow/services.js';
import { CabloyApplication } from '@cabloy/core';
// meta
export const meta = (app: CabloyApplication) => {
  const meta: any = {};

  app.bean.util.extend(meta, {
    base: {
      atoms: atomClasses,
      statics: {
        'a-app:app': {
          items: staticApps,
        },
        'a-flow.flowDef': {
          items: staticFlowDefs,
        },
        'a-baselayout:layout': {
          items: staticLayouts,
        },
        'a-base.resource': {
          items: staticResources,
        },
        'a-dict:dict': {
          items: staticDicts,
        },
        'test-flow.product': {
          items: staticProducts,
        },
      },
    },
    validation: {
      validators: {},
      keywords,
      schemas,
    },
    flow: {
      services: flowServices,
    },
    index: {
      indexes: {
        testFlowProduct: 'createdAt,updatedAt,atomId,productCode',
        testFlowPurchaseOrder: 'createdAt,updatedAt,atomId',
        testFlowPurchaseOrderDetail: 'createdAt,updatedAt,atomIdMain',
      },
    },
  });

  return meta;
};
