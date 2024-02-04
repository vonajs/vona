"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function default_1(app, modules) {
    // all metas
    app.meta.metas = {};
    // load metas
    await loadMetas();
    async function loadMetas() {
        for (const key in modules) {
            const module = modules[key];
            // module meta
            if (typeof module.resource.meta === 'function') {
                module.meta = module.resource.meta(app);
            }
            else {
                module.meta = module.resource.meta;
            }
            if (module.meta) {
                await app.meta.util.monkeyModule(app.meta.appMonkey, app.meta.modulesMonkey, 'metaLoaded', {
                    module,
                    meta: module.meta,
                });
            }
            app.meta.metas[module.info.relativeName] = module.meta;
        }
    }
}
exports.default = default_1;
//# sourceMappingURL=moduleMeta.js.map