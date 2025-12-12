import type { TypeBroadcastReloadBeanJobData } from '../bean/broadcast.reloadBean.ts';
import path from 'node:path';
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
  '**/src/controller/*.ts',
  '**/src/model/*.ts',
  '**/src/service/*.ts',
  '**/src/bean/*.*.ts',
];

const __pathesWatchStrict: TypePathWatchStrict[] = [
  ['_error', /\/src\/config\/errors.ts/],
  ['_locale', /\/src\/config\/locale\/[^/]+.ts/],
  ['_config', /\/src\/config\/config.ts/],
  ['_constant', /\/src\/config\/constants.ts/],
  ['controller', /\/src\/controller\/[^/]+.ts/],
  ['model', /\/src\/model\/[^/]+.ts/],
  ['service', /\/src\/service\/[^/]+.ts/],
  ['bean', /\/src\/bean\/[^/]+.ts/],
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
      return true;
    }
    return false;
  }

  protected async _onChange(file: string) {
    const file2 = file.replace(/\\/g, '/');
    const item = __pathesWatchStrict.find(item => item[1].test(file2));
    if (!item) return;
    const timeBegin = new Date();
    await this._reloadFile({
      sceneName: item[0],
      file: path.join(this.app.projectPath, file),
    });
    const timeEnd = new Date();
    // log
    const message = `[hmr] reload ${(timeEnd.valueOf() - timeBegin.valueOf())}ms: ${file}`;
    // eslint-disable-next-line
    console.log(chalk.cyan(message));
  }

  private async _reloadFile(data: TypeBroadcastReloadBeanJobData) {
    this.scope.broadcast.reloadBean.emit(data);
    await this._reloadFileInner(data);
  }

  public async _reloadBeanWorker(data: TypeBroadcastReloadBeanJobData) {
    await this._reloadFileInner(data);
  }

  public async _reloadFileInner(data: TypeBroadcastReloadBeanJobData) {
    return await this.bean.executor.newCtx(async () => {
      return await this.scope.service.hmr.reloadFile(data.sceneName, data.file);
    }, { dbInfo: {}, instanceName: '' });
  }

  private async _collectWatchDirs() {
    return await globby(__pathesWatch, {
      cwd: this.app.projectPath,
      onlyFiles: true,
      ignore: ['**/node_modules/**'],
    });
  }
}
