const set03_gatewayExclusive = require('./flowDef/set03_gatewayExclusive.js');
const set03_gatewayParallel = require('./flowDef/set03_gatewayParallel.js');
const set03_gatewayInclusive = require('./flowDef/set03_gatewayInclusive.js');

const flowDefs = [
  set03_gatewayExclusive, //
  set03_gatewayParallel,
  set03_gatewayInclusive,
];
export default module.meta.isProd ? [] : flowDefs;
