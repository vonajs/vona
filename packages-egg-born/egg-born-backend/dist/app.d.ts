import { CabloyApplication, Bootstrap } from '@cabloy/core';
export default class AppBootHook {
    app: CabloyApplication;
    bootstrap: Bootstrap;
    constructor(app: any);
    configWillLoad(): void;
    didLoad(): Promise<void>;
    serverDidReady(): Promise<void>;
    _prepareMiddlewares(): void;
}
//# sourceMappingURL=app.d.ts.map