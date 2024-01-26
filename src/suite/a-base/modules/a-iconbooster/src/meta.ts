import schemas from './meta/validation/schemas.js';
import iconGroups from './meta/icons/groups.js';
const meta = {
  base: {
    atoms: {},
  },
  validation: {
    validators: {},
    keywords: {},
    schemas,
  },
  icon: {
    groups: iconGroups,
  },
};
export default meta;
