import _Bundle from 'egg-mock/bootstrap.js';
import { VonaApplication, VonaContext, Cast } from 'vona';
import Assert from 'assert';
import { IModuleInfo } from '@cabloy/module-info';
import { parseModuleInfo, ParseModuleNameLevelInit } from '@cabloy/module-info-pro';
import { BaseMockApplication } from 'egg-mock';

type TypeMockCabloyApplication<T, C> = BaseMockApplication<T, C> & VonaApplication;
export interface MockCabloyApplication extends TypeMockCabloyApplication<VonaApplication, VonaContext> {}

const ParseModuleNameLevel = ParseModuleNameLevelInit + 2;

let Bundle = global.__egg_born_mock;
if (!Bundle) {
  Bundle = global.__egg_born_mock = _Bundle;

  before(async function () {
    const app = Cast<VonaApplication>(Bundle.app);
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

export function mockPath(path?: string) {
  const moduleInfo = parseModuleInfo(ParseModuleNameLevel)!;
  const app = Cast<VonaApplication>(Bundle.app);
  return app.meta.util.combineFetchPath(moduleInfo, path, true, false);
}
export function mockUrl(path?: string) {
  const moduleInfo = parseModuleInfo(ParseModuleNameLevel)!;
  const app = Cast<VonaApplication>(Bundle.app);
  return app.meta.util.combineFetchPath(moduleInfo, path, true, true);
}
export function mockModuleInfo(): IModuleInfo {
  return parseModuleInfo(ParseModuleNameLevel)!;
}
