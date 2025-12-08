import chokidar, { FSWatcher } from 'chokidar';
import debounce from 'debounce';
import { globby } from 'globby';
import { BeanBase } from 'vona';
import { Service } from 'vona-module-a-bean';

const __pathesWatch = [
  '**/src/service/*.ts',
];

type TypePathWatchStrict = [string, RegExp];
const __pathesWatchStrict: TypePathWatchStrict[] = [
  ['service', /\/src\/service\/[^/]+.ts/],
];

@Service()
export class ServiceWatch extends BeanBase {
  private _watcher?: FSWatcher;

  async start() {
    // stop
    await this.stop();
    // watcher
    const watchDirs = await this._collectWatchDirs();
    this._watcher = chokidar
      .watch(watchDirs, {
        cwd: this.app.projectPath,
      })
      .on('change', debounce(info => {
        this._onChange(info);
      }, this.scope.config.change.debounce));
  }

  async stop() {
    // close
    if (this._watcher) {
      await this._watcher.close();
      this._watcher = undefined;
    }
  }

  protected async _onChange(info: string) {
    info = info.replace(/\\/g, '/');
    const item = __pathesWatchStrict.find(item => item[1].test(info));
    if (!item) return;
    const timeBegin = new Date();
    await this.app.meta.hmr?.reloadBean(item[0], info);
    const timeEnd = new Date();
    // eslint-disable-next-line
    console.log(`[hmr] reload ${(timeEnd.valueOf() - timeBegin.valueOf())}ms: ${info}`);
  }

  private async _collectWatchDirs() {
    return await globby(__pathesWatch, {
      cwd: this.app.projectPath,
      onlyFiles: true,
      ignore: ['**/node_modules/**'],
    });
  }
}
