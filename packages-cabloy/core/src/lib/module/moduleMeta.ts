import { CabloyApplication, IModule } from '../../types/index.js';

export default async function (app: CabloyApplication, modules: Record<string, IModule>) {
  // load metas
  await loadMetas();

  async function loadMetas() {
    for (const key in modules) {
      const module = modules[key];
      // module meta
      if (module.resource.meta) {
        // metaNew is not used by now
        await app.meta.util.monkeyModule(app.meta.appMonkey, app.meta.modulesMonkey, 'metaLoaded', {
          module,
          meta: module.resource.meta,
        });
      }
    }
  }
}
