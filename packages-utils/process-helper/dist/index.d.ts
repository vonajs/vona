export interface IProcessHelperSpawnOptions {
    cwd?: string;
    logPrefix?: string;
}
export declare class ProcessHelperConsole {
    log(data: any, options?: IProcessHelperSpawnOptions): Promise<void>;
    _logInner(_data: any, text: any): Promise<void>;
    _adjustText(prefix: any, text: any): string;
}
export declare class ProcessHelper {
    cwd: string;
    console: ProcessHelperConsole;
    constructor(cwd?: string, console?: ProcessHelperConsole);
    formatFile({ fileName, logPrefix }: {
        fileName: any;
        logPrefix: any;
    }): Promise<void>;
    spawnBin({ cmd, args, options }: {
        cmd: any;
        args: any;
        options: any;
    }): Promise<string>;
    spawnCmd({ cmd, args, options }: {
        cmd: any;
        args: any;
        options: any;
    }): Promise<string>;
    spawnExe({ cmd, args, options }: {
        cmd: any;
        args: any;
        options: any;
    }): Promise<string>;
    spawn({ cmd, args, options, }: {
        cmd: string;
        args: any[];
        options: IProcessHelperSpawnOptions;
    }): Promise<string>;
    npmPublish(options?: IProcessHelperSpawnOptions): Promise<void>;
    gitCommit(message: string, options?: IProcessHelperSpawnOptions): Promise<void>;
    tsc(options?: IProcessHelperSpawnOptions): Promise<void>;
}
//# sourceMappingURL=index.d.ts.map