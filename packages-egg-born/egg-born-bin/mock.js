const path = require('node:path');
const utils = require('./lib/utils.js');

// baseDir
const baseDir = path.join(process.cwd(), 'dist/backend');
// env
process.env.EGG_BASE_DIR = baseDir;
process.env.EGG_FRAMEWORK = utils.getModulePath('egg-born-backend');
process.env.NODE_ENV = 'test';

// spec
const spec = utils.combineTestPattern({
  baseDir,
  flavor: process.env.META_FLAVOR,
  env: 'unittest',
  pattern: null,
});

module.exports = {
  'extension': ['ts'],
  spec,
  'node-option': ['no-warnings', 'loader=ts-node/esm', 'conditions=development'],
  'timeout': 0,
  'exit': true,
};

/**
 .mocharc.js
const mockConfig = require('egg-born-bin/mock.js');
 
module.exports = mockConfig;
 */
