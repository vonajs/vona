"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessHelper = exports.ProcessHelperConsole = void 0;
const child_process_1 = __importDefault(require("child_process"));
const path_1 = __importDefault(require("path"));
class ProcessHelperConsole {
    async log(data, options = {}) {
        if (!data)
            return;
        // data
        if (typeof data !== 'object') {
            data = { text: String(data) };
        }
        let { text } = data;
        // logPrefix
        const logPrefix = options.logPrefix;
        if (logPrefix) {
            text = this._adjustText(logPrefix, text);
        }
        // log
        await this._logInner(data, text);
    }
    async _logInner(_data, text) {
        // fallback
        console.log(text);
    }
    _adjustText(prefix, text) {
        return String(text)
            .split('\n')
            .map(item => (item ? prefix + item : item))
            .join('\n');
    }
}
exports.ProcessHelperConsole = ProcessHelperConsole;
class ProcessHelper {
    constructor(cwd, console = new ProcessHelperConsole()) {
        this.cwd = cwd;
        this.console = console;
    }
    async formatFile({ fileName, logPrefix }) {
        try {
            await this.spawnBin({
                cmd: 'prettier',
                args: ['--write', fileName],
                options: {
                    logPrefix,
                },
            });
        }
        catch (err) {
            if (err.code === 2) {
                // not throw error
                return;
            }
            throw err;
        }
    }
    async spawnBin({ cmd, args, options }) {
        cmd = path_1.default.join(this.cwd, 'node_modules/.bin', cmd);
        return await this.spawnCmd({ cmd, args, options });
    }
    async spawnCmd({ cmd, args, options }) {
        if (/^win/.test(process.platform)) {
            cmd = `${cmd}.cmd`;
        }
        return await this.spawn({ cmd, args, options });
    }
    async spawnExe({ cmd, args, options }) {
        if (/^win/.test(process.platform)) {
            cmd = `${cmd}.exe`;
        }
        return await this.spawn({ cmd, args, options });
    }
    async spawn({ cmd, args = [], options = {}, }) {
        if (!options.cwd) {
            options.cwd = this.cwd;
        }
        return new Promise((resolve, reject) => {
            const logPrefix = options.logPrefix;
            const proc = child_process_1.default.spawn(cmd, args, options);
            let stdout = '';
            // let stderr = '';
            proc.stdout.on('data', async (data) => {
                stdout += data.toString();
                await this.console.log({ text: data.toString() }, { logPrefix });
            });
            proc.stderr.on('data', async (data) => {
                // stderr += data.toString();
                await this.console.log({ text: data.toString() }, { logPrefix });
            });
            proc.once('exit', code => {
                if (code !== 0) {
                    const err = new Error(`spawn ${cmd} ${args.join(' ')} fail, exit code: ${code}`);
                    err.code = 10000 + Number(code);
                    return reject(err);
                }
                resolve(stdout);
            });
        });
    }
    async npmPublish({ cwd }) {
        await this.spawnCmd({
            cmd: 'npm',
            args: ['publish'],
            options: {
                cwd,
            },
        });
    }
    async gitCommit({ cwd, message }) {
        // git status
        const stdout = await this.spawnExe({
            cmd: 'git',
            args: ['status'],
            options: {
                cwd,
            },
        });
        if (stdout.indexOf('nothing to commit, working tree clean') > -1 && stdout.indexOf('is ahead of') === -1) {
            // do nothing
            return;
        }
        if (stdout.indexOf('is ahead of') === -1) {
            // git add .
            await this.spawnExe({
                cmd: 'git',
                args: ['add', '.'],
                options: {
                    cwd,
                },
            });
            // git commit
            await this.spawnExe({
                cmd: 'git',
                args: ['commit', '-m', message],
                options: {
                    cwd,
                },
            });
        }
        // git push
        await this.spawnExe({
            cmd: 'git',
            args: ['push'],
            options: {
                cwd,
            },
        });
    }
}
exports.ProcessHelper = ProcessHelper;
//# sourceMappingURL=index.js.map