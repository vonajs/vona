const path = require('path');
const utils = require('./lib/utils.js');

// env
process.env.EGG_BASE_DIR = path.join(process.cwd(), 'src/backend');
process.env.EGG_FRAMEWORK = utils.getModulePath('egg-born-backend');
process.env.NODE_ENV = 'test';

// spec
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
