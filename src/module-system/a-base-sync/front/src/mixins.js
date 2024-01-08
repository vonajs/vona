/** @module a-base/front/mixins */

import actionBase from './common/actionBase.js';
import atomClasses from './common/atomClasses.js';
import atomActions from './common/atomActions.js';
import modules from './common/modules.js';
import renderTableCellBase from './common/renderTableCellBase.js';
import authLoginBase from './common/authLoginBase.js';
import layoutManagerBase from './common/layoutManagerBase/index.jsx';

/** The mixins of a-base
 * @property {module:a-base/front/mixins/ebActionBase} ebActionBase - This provides the basic members used for action handler
 * @property {module:a-base/front/mixins/ebAtomClasses} ebAtomClasses - This provide the members of atomClasses
 * @property {object} ebAtomActions - This provide the members of atomActions
 * @property {object} ebModules - This provide the members of modules
 * @property {object} ebRenderTableCellBase - This provide the general logics of renderTableCellBase
 */
export default {
  ebActionBase: actionBase,
  ebAtomClasses: atomClasses,
  ebAtomActions: atomActions,
  ebModules: modules,
  ebRenderTableCellBase: renderTableCellBase,
  ebAuthLoginBase: authLoginBase,
  ebLayoutManagerBase: layoutManagerBase,
};
