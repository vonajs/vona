import { VonaApplication, IModule } from '../../types/index.js';
import { deepExtend } from '../utils/util.js';

export default async function (app: VonaApplication, modules: Record<string, IModule>) {
  // load configs
  await loadConfigs();

  async function loadConfigs() {
    for (const key in modules) {
      const module = modules[key];
      // module config
      if (module.resource.config) {
        const configModule = await module.resource.config(app);
        // configNew is not used by now
        await app.util.monkeyModule(app.meta.appMonkey, app.meta.modulesMonkey, 'configLoaded', module, configModule);
        app.config.modules[module.info.relativeName] = deepExtend(
          {},
          configModule,
          app.config.modules[module.info.relativeName],
        );
      }
    }
  }
}
