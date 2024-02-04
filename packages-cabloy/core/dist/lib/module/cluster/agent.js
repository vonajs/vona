"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("../../../types/index.js");
function default_1(app) {
    // ready
    let _ready = false;
    const pids = {};
    // messenger
    app.meta.messenger.addProvider({
        name: 'appReady',
        handler: data => {
            pids[data.pid] = true;
            if (!_ready) {
                _ready = true;
                // for agent: event: appReady
                app.emit(index_js_1.EnumAppEvent.AppReady);
            }
        },
    });
}
exports.default = default_1;
//# sourceMappingURL=agent.js.map