import uuid from 'uuid';
import { BeanBase } from './bean/beanBase.js';
const eventMessengerCall = 'eb:event:messengerCall';

export default function (loader) {
  // messenger
  loader.app.meta.messenger = loader.app.bean._newBean(Messenger);
}

export class Messenger extends BeanBase {
  _providers: object = {};
  _pids: any = null;

  __init__() {
    const app = this.app as any;
    // wait for call
    app.messenger.on(eventMessengerCall, async info => {
      const provider = this._providers[info.name];
      let data;
      let err;
      try {
        data = await provider.handler(info.data);
      } catch (error) {
        err = app.meta.util.createError(error, true);
      }
      if (info.echo) {
        if (app.meta.inApp) {
          this.sendAgent(info.echo, { err, data });
        } else {
          this.sendTo(info.pid, info.echo, { err, data });
        }
      }
    });

    // in agent
    if (app.meta.inAgent) {
      // get pids
      app.messenger.on('egg-pids', data => {
        this._pids = data;
      });
    }
  }

  callAgent(info, cb) {
    info.pid = process.pid;
    this._call(null, info, cb);
  }

  callRandom(info, cb) {
    this._call(null, info, cb);
  }

  callTo(pid, info, cb) {
    this._call(pid, info, cb);
  }

  callAll(info) {
    this.sendToApp(eventMessengerCall, info);
  }

  // info: { name, data }
  _call(pid, info, cb) {
    const app = this.app as any;
    if (cb) {
      info.echo = uuid.v4();
      app.messenger.once(info.echo, info => {
        return cb(info);
      });
    }
    if (app.meta.inApp) {
      this.sendAgent(eventMessengerCall, info);
    } else {
      if (pid) {
        this.sendTo(pid, eventMessengerCall, info);
      } else {
        this.sendRandom(eventMessengerCall, info);
      }
    }
  }

  sendToApp(eventName, info) {
    const app = this.app as any;
    app.messenger.sendToApp(eventName, info);
  }
  sendTo(pid, eventName, info) {
    const app = this.app as any;
    if (app.meta.isTest || !this._pids) {
      // support init:backend
      app.messenger.sendToApp(eventName, info);
    } else {
      app.messenger.sendTo(pid, eventName, info);
    }
  }
  sendRandom(eventName, info) {
    const app = this.app as any;
    if (app.meta.isTest || !this._pids) {
      // support init:backend
      app.messenger.sendToApp(eventName, info);
    } else {
      app.messenger.sendRandom(eventName, info);
    }
  }
  sendAgent(eventName, info) {
    const app = this.app as any;
    app.messenger.sendToAgent(eventName, info);
  }

  addProvider(provider) {
    this._providers[provider.name] = provider;
  }
}
