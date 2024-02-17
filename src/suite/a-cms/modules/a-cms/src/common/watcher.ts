import { __ThisModule__ } from '../resource/this.js';
import chokidar from 'chokidar';
import debounce from 'debounce';
import { BeanBase, Cast } from '@cabloy/core';

export class Watcher extends BeanBase {
  _watchers: any;

  __init__() {
    this._watchers = {};
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

  _getWatcherKey({ subdomain, atomClass }: any) {
    return `${subdomain}&&${atomClass.module}&&${atomClass.atomClassName}`;
  }

  _getWatcherAtomClass({ subdomain, atomClass }: any) {
    const watcherKey = this._getWatcherKey({ subdomain, atomClass });
    if (!this._watchers[watcherKey]) {
      this._watchers[watcherKey] = {};
    }
    return this._watchers[watcherKey];
  }

  _getWatcherAtomClassLanguage({ subdomain, atomClass, language }: any) {
    const watchers = this._getWatcherAtomClass({ subdomain, atomClass });
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
  _register({ subdomain, atomClass, language, watchers }: any) {
    // watcherEntry
    const watcherEntry = this._getWatcherAtomClassLanguage({ subdomain, atomClass, language });
    watcherEntry.info = { subdomain, atomClass, language, watchers };
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
      debounce(() => {
        this.app.meta.messenger.callRandom({
          name: 'a-cms:watcherChange',
          data: { subdomain, atomClass, language },
        });
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
}
