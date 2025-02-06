#!/usr/bin/env node

const mock = require('egg-mock');

(async function () {
  // options
  const options = {};
  options.baseDir = process.env.EGG_BASE_DIR;
  options.framework = process.env.EGG_FRAMEWORK;

  // env
  mock.env('unittest');
  // app
  const app = mock.app(options);
  await app.ready();

  // wait app started
  await app.meta.waitAppStarted();

  // exit
  process.exit(0);
})();
