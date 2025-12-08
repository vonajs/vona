import { FSWatcher } from 'chokidar';
import { BeanBase } from 'vona';
import { Service } from 'vona-module-a-bean';

@Service()
export class ServiceWatch extends BeanBase {
  watcherDevelopment: FSWatcher | null = null;
  start() {
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

  stop() {}
}
