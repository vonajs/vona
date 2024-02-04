"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ready_js_1 = require("../version/ready.js");
function default_1(app) {
    const versionReady = app.bean._newBean(ready_js_1.VersionReady);
    // initialize
    versionReady.initialize();
    // eb_clear
    app.messenger.once('eb_clear', async (data) => {
        await app.meta.queue._clearWorkers();
        process.send({ to: 'master', action: 'eb_clear_done', data: { id: data.id } });
    });
}
exports.default = default_1;
// maybe cause some resources initialized more times
// async function __versionReady(app) {
//   try {
//     await versionReady(app);
//   } catch (err) {
//     console.error(err);
//     setTimeout(async () => {
//       await __versionReady(app);
//     }, app.config.versionReady.retry.timeout);
//   }
// }
//# sourceMappingURL=app.js.map