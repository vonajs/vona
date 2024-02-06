import { __ThisModule__ } from '../resource/this.js';
import path from 'path';
import fse from 'fs-extra';
import chokidar from 'chokidar';
import debounce from 'debounce';
import { BeanBase, Cast } from '@cabloy/core';
import eggBornUtils from 'egg-born-utils';

export class Watcher extends BeanBase {
  _watchers: any;
  _freezeCounter: any;
  _needReload: any;
  _reloadDebounce: any;

  constructor() {
    super();
    this._watchers = {};
    this._freezeCounter = 0;
    this._needReload = false;
    this._reloadDebounce = debounce(() => {
      if (this._freezeCounter === 0 && this._needReload) {
        this._needReload = false;
        this._reloadByAgent();
      }
    }, 1000);
  }

  __init__() {
    if (this.app.meta.inApp) {
      // this.app
      this.app.meta.messenger.addProvider({
        name: 'a-cms:watcherChange',
        handler: async info => {
          await this._change(info);
        },
      });
    } else {
      // agent
      this.app.meta.messenger.addProvider({
        name: 'a-cms:watcherRegister',
        handler: info => {
          this._register(info);
        },
      });
      this.app.meta.messenger.addProvider({
        name: 'a-cms:watcherRegisterLanguages',
        handler: info => {
          this._registerLanguages(info);
        },
      });
      this.app.meta.messenger.addProvider({
        name: 'a-cms:reload',
        handler: info => {
          this._reloadByApp(info);
        },
      });
    }
  }

  // called by this.app
  register(info) {
    this.app.meta.messenger.callAgent({ name: 'a-cms:watcherRegister', data: info });
  }

  // called by this.app
  registerLanguages(info) {
    this.app.meta.messenger.callAgent({ name: 'a-cms:watcherRegisterLanguages', data: info });
  }

  // called by this.app
  reload({ action }: any) {
    this.app.meta.messenger.callAgent({ name: 'a-cms:reload', data: { action } });
  }

  _getWatcherKey({ development, subdomain, atomClass }: any) {
    if (development) return 'development';
    return `${subdomain}&&${atomClass.module}&&${atomClass.atomClassName}`;
  }

  _getWatcherAtomClass({ development, subdomain, atomClass }: any) {
    const watcherKey = this._getWatcherKey({ development, subdomain, atomClass });
    if (!this._watchers[watcherKey]) {
      this._watchers[watcherKey] = {};
    }
    return this._watchers[watcherKey];
  }

  _getWatcherAtomClassLanguage({ development, subdomain, atomClass, language }: any) {
    const watchers = this._getWatcherAtomClass({ development, subdomain, atomClass });
    if (!watchers[language]) {
      watchers[language] = {};
    }
    return watchers[language];
  }

  // invoked in agent
  _registerLanguages({ info, watcherInfos }: any) {
    // clear
    const watchers = this._getWatcherAtomClass({ subdomain: info.subdomain, atomClass: info.atomClass });
    for (const language in watchers) {
      const watcherEntry = watchers[language];
      if (watcherEntry.watcher) {
        watcherEntry.watcher.close();
        watcherEntry.watcher = null;
      }
    }
    // register
    for (const watcherInfo of watcherInfos) {
      this._register(watcherInfo);
    }
  }

  // invoked in agent
  _register({ development, subdomain, atomClass, language, watchers }: any) {
    // watchers
    if (development) {
      watchers = this._collectDevelopmentWatchDirs();
    }
    // watcherEntry
    const watcherEntry = this._getWatcherAtomClassLanguage({ development, subdomain, atomClass, language });
    watcherEntry.info = { development, subdomain, atomClass, language, watchers };
    // close
    if (watcherEntry.watcher) {
      const _watcher = watcherEntry.watcher;
      if (!_watcher.__eb_closed) {
        if (_watcher.__eb_ready) {
          _watcher.close();
        } else {
          _watcher.__eb_closing = true;
        }
      }
      watcherEntry.watcher = null;
    }
    // watcher
    const _watcher = chokidar.watch(watchers).on(
      'change',
      debounce(info => {
        if (development) {
          this._developmentChange(info);
        } else {
          this.app.meta.messenger.callRandom({
            name: 'a-cms:watcherChange',
            data: { subdomain, atomClass, language },
          });
        }
      }, 300),
    );
    // on ready
    const _watcher2 = Cast(_watcher);
    _watcher.once('ready', function () {
      _watcher2.__eb_ready = true;
      if (_watcher2.__eb_closing) {
        _watcher.close();
        _watcher2.__eb_closed = true;
      }
    });
    // ok
    watcherEntry.watcher = _watcher;
  }

  // invoked in this.app
  async _change({ subdomain, atomClass, language }: any) {
    this.app.meta.queue.push({
      subdomain,
      module: __ThisModule__,
      queueName: 'render',
      queueNameSub: `${atomClass.module}:${atomClass.atomClassName}`,
      data: {
        queueAction: 'buildLanguage',
        atomClass,
        language,
      },
    });
  }

  // invoked in agent
  _collectDevelopmentWatchDirs() {
    const __pathes = [
      'src/backend/config',
      'src/backend/demo',
      'src/module',
      'src/module-vendor',
      'src/suite',
      'src/suite-vendor',
      'packages-cabloy/core',
    ];
    const cwd = process.cwd();
    const watchDirs: any[] = [];
    for (const __path of __pathes) {
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
  async _developmentChange(info) {
    info = info.replace(/\\/g, '/');
    if (info.indexOf('.ts') === -1) return;
    // log
    this.app.logger.warn(`[agent:development] reload worker because ${info} changed`);
    // tsc
    const __pathes = ['src/backend/config', 'src/backend/demo', 'packages-cabloy/core'];
    if (__pathes.some(item => info.indexOf(item) > -1)) {
      await eggBornUtils.process.spawnBin({ cmd: 'tsc', args: ['-b'], options: { cwd: process.cwd() } });
    }
    // reload
    this._reloadByApp({ action: 'now' });
  }

  // invoked in agent
  _reloadByAgent() {
    Cast(process).send({
      to: 'master',
      action: 'reload-worker',
    });
  }

  //  invoked in agent
  _reloadByApp({ action }: any) {
    if (action === 'now') {
      if (this._freezeCounter > 0) {
        this._needReload = true;
      } else {
        this._reloadByAgent();
      }
    } else if (action === 'freeze') {
      this._freezeCounter++;
    } else if (action === 'unfreeze') {
      this._freezeCounter--;
      if (this._freezeCounter === 0 && this._needReload) {
        this._reloadDebounce();
      }
    }
  }
}
