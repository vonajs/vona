import filterTabBasic from './schema/filterTabBasic.js';
import filterTabGeneral from './schema/filterTabGeneral.js';
import layout from './schema/layout.js';

const schemas = {};
// filterTabBasic
Object.assign(schemas, filterTabBasic);
// filterTabGeneral
Object.assign(schemas, filterTabGeneral);
// layout
Object.assign(schemas, layout);
// ok
export default schemas;
