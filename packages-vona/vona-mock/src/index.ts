import _Bundle from 'egg-mock/bootstrap.js';
import { VonaApplication, VonaContext, cast } from 'vona';
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
    const app = cast<VonaApplication>(Bundle.app);
    // wait ready
    await Bundle.app.ready();
    // session
    Bundle.app.mockSession({});
    // wait app ready
    await app.meta.waitAppReady();
    // restore
    Bundle.mock.restore();
  });

  after(async function () {
    await Bundle.app.close();
  });
}

export const app = cast<MockCabloyApplication>(Bundle.app);
export const mock = Bundle.mock;
export const mm = Bundle.mm;

export function mockPath(path?: string) {
  const moduleInfo = parseModuleInfo(ParseModuleNameLevel)!;
  const app = cast<VonaApplication>(Bundle.app);
  return app.util.combineApiPath(moduleInfo.relativeName, path, false, true);
}
export function mockUrl(path?: string) {
  const moduleInfo = parseModuleInfo(ParseModuleNameLevel)!;
  const app = cast<VonaApplication>(Bundle.app);
  return app.util.combineApiPath(moduleInfo.relativeName, path, true, true);
}
export function mockModuleInfo(): IModuleInfo {
  return parseModuleInfo(ParseModuleNameLevel)!;
}
