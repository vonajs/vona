import { CabloyApplication } from '@cabloy/core';
import * as Assert from 'assert';
import { parseModuleInfo, ParseModuleNameLevelInit } from '@cabloy/module-info';
const ParseModuleNameLevel = ParseModuleNameLevelInit + 2;

let bundle = global.__egg_born_mock;
if (!bundle) {
  global.__egg_born_mock = bundle = require('egg-mock/bootstrap');

  before(async () => {
    // session
    bundle.app.mockSession({});
    // wait app ready
    await bundle.app.meta.checkAppReady();
    // restore
    bundle.mock.restore();
  });

  after(async () => {
    await bundle.app.close();
  });
}

export const assert = Assert;
export const app = bundle.app as CabloyApplication;
export const mock = bundle.mock;
export const mm = bundle.mock;

export function mockUrl(url, apiPrefix = true) {
  const moduleInfo = mockInfo();
  return app.meta.mockUtil.mockUrl(moduleInfo, url, apiPrefix);
}
export function mockInfo() {
  return parseModuleInfo(ParseModuleNameLevel);
}
