import _Bundle from 'egg-mock/bootstrap.js';
import { CabloyApplication, CabloyContext, Cast } from 'vona';
import Assert from 'assert';
import { IModuleInfo } from '@cabloy/module-info';
import { parseModuleInfo, ParseModuleNameLevelInit } from '@cabloy/module-info-pro';
import { BaseMockApplication } from 'egg-mock';

type TypeMockCabloyApplication<T, C> = BaseMockApplication<T, C> & CabloyApplication;
export interface MockCabloyApplication extends TypeMockCabloyApplication<CabloyApplication, CabloyContext> {}

const ParseModuleNameLevel = ParseModuleNameLevelInit + 2;

let Bundle = global.__egg_born_mock;
if (!Bundle) {
  Bundle = global.__egg_born_mock = _Bundle;

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
