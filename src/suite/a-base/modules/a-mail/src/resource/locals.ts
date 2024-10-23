export * from '../local/scene.js';

import { LocalScene } from '../local/scene.js';

export interface IModuleService {
  scene: LocalScene;
}
