import { CabloyApplication } from '../../types/index.js';

export default async function (app: CabloyApplication, modules) {
  // load metas
  await loadMetas();

  async function loadMetas() {
    for (const key in modules) {
      const module = modules[key];
      // module meta
      if (module.main.meta) {
        // metaNew is not used by now
        app.meta.util.monkeyModule(app.meta.appMonkey, app.meta.modulesMonkey, 'metaLoaded', {
          module,
          meta: module.main.meta,
        });
      }
    }
  }
}
