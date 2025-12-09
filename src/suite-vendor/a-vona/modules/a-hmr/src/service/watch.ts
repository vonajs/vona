import type { TypeBroadcastReloadBeanJobData } from '../bean/broadcast.reloadBean.ts';
import chokidar, { FSWatcher } from 'chokidar';
import debounce from 'debounce';
import { globby } from 'globby';
import { BeanBase } from 'vona';
import { Service } from 'vona-module-a-bean';

type TypePathWatchStrict = [string, RegExp];

const __pathesWatch = [
  '**/src/service/*.ts',
];

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
      .on('change', debounce(file => {
        this._onChange(file);
      }, this.scope.config.change.debounce));
  }

  async stop() {
    // close
    if (this._watcher) {
      await this._watcher.close();
      this._watcher = undefined;
    }
  }

  protected async _onChange(file: string) {
    file = file.replace(/\\/g, '/');
    const item = __pathesWatchStrict.find(item => item[1].test(file));
    if (!item) return;
    const timeBegin = new Date();
    await this._reloadBean(file);
    const timeEnd = new Date();
    // eslint-disable-next-line
    console.log(`[hmr] reload ${(timeEnd.valueOf() - timeBegin.valueOf())}ms: ${file}`);
  }

  private async _reloadBean(file: string) {
    await this.app.meta.hmr?.reloadFile(file);
    this.scope.broadcast.reloadBean.emit({ file });
  }

  public async _reloadBeanWorker(item: TypeBroadcastReloadBeanJobData) {
    await this.app.meta.hmr?.reloadFile(item.file);
  }

  private async _collectWatchDirs() {
    return await globby(__pathesWatch, {
      cwd: this.app.projectPath,
      onlyFiles: true,
      ignore: ['**/node_modules/**'],
    });
  }
}
