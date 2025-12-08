import chokidar, { FSWatcher } from 'chokidar';
import debounce from 'debounce';
import { globby } from 'globby';
import { BeanBase, cast, pathToHref } from 'vona';
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
  private _watcherInstance?: FSWatcher;

  async start() {
    // stop
    this.stop();
    // watcher
    const watchDirs = await this._collectWatchDirs();
    const _watcher = chokidar.watch(watchDirs, {
      cwd: this.app.projectPath,
    }).on(
      'change',
      debounce(info => {
        this._onChange(info);
      }, this.scope.config.change.debounce),
    );
    // on ready
    const _watcher2 = cast(_watcher);
    _watcher.once('ready', () => {
      _watcher2.__eb_ready = true;
      if (_watcher2.__eb_closing) {
        _watcher.close();
        _watcher2.__eb_closed = true;
      }
    });
    // ok
    this._watcherInstance = _watcher;
  }

  stop() {
    // close
    if (this._watcherInstance) {
      const _watcher = cast(this._watcherInstance);
      if (!_watcher.__eb_closed) {
        if (_watcher.__eb_ready) {
          _watcher.close();
        } else {
          _watcher.__eb_closing = true;
        }
      }
      this._watcherInstance = undefined;
    }
  }

  protected async _onChange(info: string) {
    info = info.replace(/\\/g, '/');
    const item = __pathesWatchStrict.find(item => item[1].test(info));
    if (!item) return;
    const timeBegin = new Date();
    await this._reload(item[0], info);
    const timeEnd = new Date();
    // eslint-disable-next-line
    console.log(`[hmr] reload ${(timeEnd.valueOf() - timeBegin.valueOf())}ms: ${info}`);
  }

  protected async _reload(scene: string, file: string) {
    const fileUrl = `${pathToHref(file)}?${Date.now()}`;
    const fileInstance = await import(fileUrl);
    console.log(scene, fileInstance);
  }

  private async _collectWatchDirs() {
    return await globby(__pathesWatch, {
      cwd: this.app.projectPath,
      onlyFiles: true,
      ignore: ['**/node_modules/**'],
    });
  }
}
