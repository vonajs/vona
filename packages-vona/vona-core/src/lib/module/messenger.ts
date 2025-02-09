import { BeanSimple } from '../bean/beanSimple.js';
import { VonaApplication } from '../../types/index.js';
import { uuidv4 } from '../utils/util.js';
const eventMessengerCall = 'eb:event:messengerCall';

interface IMessengerCallbackContext {
  name: string;
  data: any;
}
type IMessengerCallback = (info: IMessengerCallbackContext) => void;

export class AppMessenger extends BeanSimple {
  _providers: object = {};
  _pids: any = null;

  protected __init__() {
    const app = this.app;
    // wait for call
    app.messenger.on(eventMessengerCall, async info => {
      const provider = this._providers[info.name];
      let data;
      let err;
      try {
        data = await provider.handler(info.data);
      } catch (error) {
        err = app.util.createError(error, true);
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

  callAgent(info, cb?: IMessengerCallback) {
    info.pid = process.pid;
    this._call(null, info, cb);
  }

  callRandom(info, cb?: IMessengerCallback) {
    this._call(null, info, cb);
  }

  callTo(pid, info, cb?: IMessengerCallback) {
    this._call(pid, info, cb);
  }

  callAll(info) {
    this.sendToApp(eventMessengerCall, info);
  }

  // info: { name, data }
  _call(pid, info, cb?: IMessengerCallback) {
    const app = this.app;
    if (cb) {
      info.echo = uuidv4();
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
    const app = this.app;
    app.messenger.sendToApp(eventName, info);
  }
  sendTo(pid, eventName, info) {
    const app = this.app;
    if (app.meta.isTest || !this._pids) {
      // support init:backend
      app.messenger.sendToApp(eventName, info);
    } else {
      app.messenger.sendTo(pid, eventName, info);
    }
  }
  sendRandom(eventName, info) {
    const app = this.app;
    if (app.meta.isTest || !this._pids) {
      // support init:backend
      app.messenger.sendToApp(eventName, info);
    } else {
      app.messenger.sendRandom(eventName, info);
    }
  }
  sendAgent(eventName, info) {
    const app = this.app;
    app.messenger.sendToAgent(eventName, info);
  }

  addProvider(provider) {
    this._providers[provider.name] = provider;
  }
}

export default function (_app: VonaApplication) {}
