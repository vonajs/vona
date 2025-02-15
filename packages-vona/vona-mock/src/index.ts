import type { IModuleInfo } from '@cabloy/module-info';
import type { BaseMockApplication } from 'egg-mock';
import type { VonaApplication, VonaContext } from 'vona';
import { parseModuleInfo, ParseModuleNameLevelInit } from '@cabloy/module-info-pro';
import _Bundle from 'egg-mock/bootstrap.js';
import { cast } from 'vona';

type TypeMockCabloyApplication<T, C> = BaseMockApplication<T, C> & VonaApplication;
export interface MockCabloyApplication extends TypeMockCabloyApplication<VonaApplication, VonaContext> {}

const ParseModuleNameLevel = ParseModuleNameLevelInit + 2;

let Bundle = globalThis.__egg_born_mock;
if (!Bundle) {
  Bundle = globalThis.__egg_born_mock = _Bundle;

  // eslint-disable-next-line
  before(async function () {
    const app = cast<VonaApplication>(Bundle.app);
    // wait ready
    await Bundle.app.ready();
    // session
    // Bundle.app.mockSession({});
    // wait app started
    await app.meta.waitAppStarted();
    // restore
    // Bundle.mock.restore();
  });

  // eslint-disable-next-line
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
