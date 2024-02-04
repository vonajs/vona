import { CabloyApplication } from '../../types/index.js';
export declare class Bootstrap {
    app: CabloyApplication;
    constructor(app: CabloyApplication);
    loadModules(): Promise<void>;
    versionReady(): Promise<void>;
    socketioReady(): Promise<void>;
}
//# sourceMappingURL=bootstrap.d.ts.map