import Bundle from 'egg-mock/bootstrap.js';
import { CabloyApplication, CabloyContext, Cast } from '@cabloy/core';
import Assert from 'assert';
import { IModuleInfo, parseModuleInfo, ParseModuleNameLevelInit } from '@cabloy/module-info';
import { BaseMockApplication } from 'egg-mock';
export interface MockCabloyApplication extends BaseMockApplication<CabloyApplication, CabloyContext> {}

const ParseModuleNameLevel = ParseModuleNameLevelInit + 2;

if (global.__egg_born_mock === undefined) {
  global.__egg_born_mock = true;

  before(async function () {
    const app = Cast<CabloyApplication>(Bundle.app);
    // wait ready
    await Bundle.app.ready();
    // session
    Bundle.app.mockSession({});
    // wait app ready
    await app.meta.checkAppReady();
    // restore
    Bundle.mock.restore();
  });

  after(async function () {
    await Bundle.app.close();
  });
}

export const assert = Assert;
export const app = Cast<MockCabloyApplication>(Bundle.app);
export const mock = Bundle.mock;
export const mm = Bundle.mm;

export function mockUrl(url, apiPrefix = true) {
  const moduleInfo = parseModuleInfo(ParseModuleNameLevel)!;
  const app = Cast<CabloyApplication>(Bundle.app);
  return app.meta.mockUtil.mockUrl(moduleInfo, url, apiPrefix);
}
export function mockInfo(): IModuleInfo {
  return parseModuleInfo(ParseModuleNameLevel)!;
}
