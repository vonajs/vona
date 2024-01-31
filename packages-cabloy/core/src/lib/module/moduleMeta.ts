import { CabloyApplication, IModule } from '../../types/index.js';

export default async function (app: CabloyApplication, modules: Record<string, IModule>) {
  // all metas
  app.meta.metas = {};

  // load metas
  await loadMetas();

  async function loadMetas() {
    for (const key in modules) {
      const module = modules[key];
      // module meta
      let meta;
      if (typeof module.meta === 'function') {
        meta = module.meta(app);
      } else {
        meta = module.meta;
      }
      if (meta) {
        await app.meta.util.monkeyModule(app.meta.appMonkey, app.meta.modulesMonkey, 'metaLoaded', {
          module,
          meta,
        });
      }
      app.meta.metas[module.info.relativeName] = meta;
    }
  }
}
