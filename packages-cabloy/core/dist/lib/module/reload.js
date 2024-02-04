"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppReload = void 0;
const beanSimple_js_1 = require("../bean/beanSimple.js");
class AppReload extends beanSimple_js_1.BeanSimple {
    now() {
        this.app.meta['a-cms:watcher'].reload({ action: 'now' });
    }
    freeze() {
        this.app.meta['a-cms:watcher'].reload({ action: 'freeze' });
    }
    unfreeze() {
        this.app.meta['a-cms:watcher'].reload({ action: 'unfreeze' });
    }
}
exports.AppReload = AppReload;
//# sourceMappingURL=reload.js.map