import type { TypeBroadcastReloadBeanJobData } from '../bean/broadcast.reloadBean.ts';
import chalk from 'chalk';
import chokidar, { FSWatcher } from 'chokidar';
import debounce from 'debounce';
import { globby } from 'globby';
import { BeanBase } from 'vona';
import { Service } from 'vona-module-a-bean';

type TypePathWatchStrict = [string, RegExp];

const __pathesWatch = [
  '**/src/config/errors.ts',
  '**/src/config/locale/*.ts',
  '**/src/config/config.ts',
  '**/src/config/constants.ts',
  '**/src/service/*.ts',
];

const __pathesWatchStrict: TypePathWatchStrict[] = [
  ['_error', /\/src\/config\/errors.ts/],
  ['_locale', /\/src\/config\/locale\/[^/]+.ts/],
  ['_config', /\/src\/config\/config.ts/],
  ['_constant', /\/src\/config\/constants.ts/],
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
    await this._reloadFile(item[0], file);
    const timeEnd = new Date();
    // log
    const message = `[hmr] reload ${(timeEnd.valueOf() - timeBegin.valueOf())}ms: ${file}`;
    // eslint-disable-next-line
    console.log(chalk.cyan(message));
  }

  private async _reloadFile(sceneName: string, file: string) {
    await this.scope.service.hmr.reloadFile(sceneName, file);
    this.scope.broadcast.reloadBean.emit({ sceneName, file });
  }

  public async _reloadBeanWorker(data: TypeBroadcastReloadBeanJobData) {
    await this.scope.service.hmr.reloadFile(data.sceneName, data.file);
  }

  private async _collectWatchDirs() {
    return await globby(__pathesWatch, {
      cwd: this.app.projectPath,
      onlyFiles: true,
      ignore: ['**/node_modules/**'],
    });
  }
}
