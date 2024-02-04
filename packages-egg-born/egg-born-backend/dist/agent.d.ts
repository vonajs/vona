import { CabloyApplication, Bootstrap } from '@cabloy/core';
export default class AppBootHook {
    app: CabloyApplication;
    bootstrap: Bootstrap;
    constructor(app: any);
    didLoad(): Promise<void>;
}
//# sourceMappingURL=agent.d.ts.map