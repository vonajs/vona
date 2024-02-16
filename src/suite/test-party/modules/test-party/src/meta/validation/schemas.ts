import partyExpense from './schema/partyExpense.js';
import blocks from './schema/blocks.js';
import formTest from './schema/formTest.js';
import party from './schema/party.js';
import partyOverBulk from './schema/partyOverBulk.js';
import settings from './schema/settings.js';

const schemas: any = {};
// partyExpense
Object.assign(schemas, partyExpense);
// blocks
Object.assign(schemas, blocks);
// formTest
Object.assign(schemas, formTest);
// party
Object.assign(schemas, party);
// partyOver
Object.assign(schemas, partyOverBulk);
// settings
Object.assign(schemas, settings);
// ok
export default schemas;
