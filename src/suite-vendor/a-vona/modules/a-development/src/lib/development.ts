import path from 'node:path';
import { ProcessHelper } from '@cabloy/process-helper';
import chokidar from 'chokidar';
import debounce from 'debounce';
import fse from 'fs-extra';
import { cast, reloadApp } from 'vona';

const __pathesWatch = [
  'src/backend/config',
  'src/backend/demo',
  'src/module',
  'src/module-vendor',
  'src/suite',
  'src/suite-vendor',
  'packages-vona/vona',
];
const __pathesTsc = ['src/backend/config', 'src/backend/demo', 'packages-vona/vona'];
const __pathesIgnore = ['/test/', '.test.ts'];

export function developmentWatchDirs() {
  let watcherDevelopment: chokidar.FSWatcher | null = null;

  _register();

  // invoked in agent
  function _register() {
    // watchDirs
    const watchDirs = _collectDevelopmentWatchDirs();
    // close
    if (watcherDevelopment) {
      const _watcher = cast(watcherDevelopment);
      if (!_watcher.__eb_closed) {
        if (_watcher.__eb_ready) {
          _watcher.close();
        } else {
          _watcher.__eb_closing = true;
        }
      }
      watcherDevelopment = null;
    }
    // watcher
    const _watcher = chokidar.watch(watchDirs).on(
      'change',
      debounce(info => {
        _developmentChange(info);
      },
      // todo: app.config.development.debounce
      1000),
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
    watcherDevelopment = _watcher;
  }

  // invoked in agent
  function _collectDevelopmentWatchDirs() {
    const cwd = process.cwd();
    const watchDirs: any[] = [];
    for (const __path of __pathesWatch) {
      const pathDir = path.join(cwd, __path);
      if (fse.existsSync(pathDir)) {
        watchDirs.push(pathDir);
      }
    }
    return watchDirs;
    // const pathSrc = path.resolve(this.app.config.baseDir, '..');
    // let watchDirs = eggBornUtils.tools.globbySync(`${pathSrc}/**/backend/src`, { onlyDirectories: true });
    // watchDirs = [path.join(pathSrc, 'backend/config')].concat(watchDirs);
    // return watchDirs;
  }

  // invoked in agent
  async function _developmentChange(info: string) {
    info = info.replace(/\\/g, '/');
    // extname
    const extname = path.extname(info);
    if (!['.ts', '.mts'].includes(extname)) return;
    // ignores
    if (__pathesIgnore.some(item => info.includes(item))) return;
    // log
    // eslint-disable-next-line
    console.log(`[development] reload worker because ${info} changed`);
    // tsc
    if (extname !== '.mts') {
      if (__pathesTsc.some(item => info.includes(item))) {
        const processHelper = new ProcessHelper();
        await processHelper.tsc();
      }
    }
    // reloadAll
    // await app.bean.worker.reloadAll();
    await reloadApp();
  }
}
