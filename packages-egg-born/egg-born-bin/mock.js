const path = require('path');
const utils = require('./lib/utils.js');

let spec = utils.combineTestPattern({
  baseDir: path.join(process.cwd(), 'src/backend'),
  env: 'unittest',
  pattern: null,
});
spec = ['src/suite/test-party/modules/test-party/test/controller/test.test.ts'];
module.exports = {
  extension: ['ts'],
  spec,
  'node-option': ['no-warnings', 'import=tsx/esm'],
};
