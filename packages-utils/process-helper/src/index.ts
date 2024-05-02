import ChildProcess from 'child_process';
import path from 'path';

export interface IProcessHelperSpawnOptions {
  cwd?: string;
  logPrefix?: string;
  stdio?: any;
}

export class ProcessHelperConsole {
  async log(data, options: IProcessHelperSpawnOptions = {}) {
    if (!data) return;
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

export class ProcessHelper {
  cwd: string;
  console: ProcessHelperConsole;

  constructor(cwd?: string, console?: ProcessHelperConsole) {
    this.cwd = cwd || process.cwd();
    this.console = console || new ProcessHelperConsole();
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
    } catch (err: any) {
      if (err.code === 2) {
        // not throw error
        return;
      }
      throw err;
    }
  }
  async spawnBin({ cmd, args, options }) {
    cmd = path.join(this.cwd, 'node_modules/.bin', cmd);
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
  async spawn({
    cmd,
    args = [],
    options = {},
  }: {
    cmd: string;
    args: any[];
    options: IProcessHelperSpawnOptions;
  }): Promise<string> {
    options.cwd = options.cwd || this.cwd;
    options.stdio = options.stdio || 'inherit';
    return new Promise((resolve, reject) => {
      const logPrefix = options.logPrefix;
      const proc = ChildProcess.spawn(cmd, args, options);
      let stdout = '';
      // let stderr = '';
      proc.stdout.on('data', async data => {
        stdout += data.toString();
        await this.console.log({ text: data.toString() }, { logPrefix });
      });
      proc.stderr.on('data', async data => {
        // stderr += data.toString();
        await this.console.log({ text: data.toString() }, { logPrefix });
      });
      proc.once('exit', code => {
        if (code !== 0) {
          const err = new Error(`spawn ${cmd} ${args.join(' ')} fail, exit code: ${code}`);
          (<any>err).code = 10000 + Number(code);
          return reject(err);
        }
        resolve(stdout);
      });
    });
  }
  async npmPublish(options?: IProcessHelperSpawnOptions) {
    await this.spawnCmd({
      cmd: 'npm',
      args: ['publish'],
      options,
    });
  }
  async gitCommit(message: string, options?: IProcessHelperSpawnOptions) {
    // git status
    const stdout = await this.spawnExe({
      cmd: 'git',
      args: ['status'],
      options,
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
        options,
      });
      // git commit
      await this.spawnExe({
        cmd: 'git',
        args: ['commit', '-m', message],
        options,
      });
    }
    // git push
    await this.spawnExe({
      cmd: 'git',
      args: ['push'],
      options,
    });
  }
  async tsc(options?: IProcessHelperSpawnOptions) {
    const timeBegin = new Date();
    await this.console.log(`tsc -b begin, pid: ${process.pid}`);
    await this.spawnBin({
      cmd: 'tsc',
      args: ['-b'],
      options,
    });
    const timeEnd = new Date();
    await this.console.log(`tsc -b end, pid: ${process.pid}: ${(timeEnd.valueOf() - timeBegin.valueOf()) / 1000}s`);
  }
}
