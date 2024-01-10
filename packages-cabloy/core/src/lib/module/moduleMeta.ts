export default async function (app, modules) {
  // load metas
  await loadMetas();

  async function loadMetas() {
    for (const key in modules) {
      const module = modules[key];
      // module meta
      if (module.main.meta) {
        // metaNew is not used by now
        const metaNew = app.meta.util.monkeyModule(app.meta.appMonkey, app.meta.modulesMonkey, 'metaLoaded', {
          module,
          meta: module.main.meta,
        });
        if (metaNew) {
          module.main.meta = metaNew;
        }
      }
    }
  }
}
