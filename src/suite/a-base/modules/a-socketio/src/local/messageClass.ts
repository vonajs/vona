import { __ThisModule__ } from '../resource/this.js';
import { Local, BeanBase } from '@cabloy/core';

const _cacheMessageClasses: any = {};
const _cacheChannels: any = {};

@Local()
export class LocalMessageClass extends BeanBase {
  get modelMessageClass() {
    return this.ctx.model.module(__ThisModule__).messageClass;
  }

  async getMessageClassId({ id, module, messageClassName }: any) {
    if (id) return id;
    const messageClass = await this.get({ module, messageClassName });
    return messageClass.id;
  }

  async get({ id, module, messageClassName }: any) {
    const data = id ? { id } : { module, messageClassName };
    const res = await this.modelMessageClass.get(data);
    if (res) return res;
    if (!module || !messageClassName) throw new Error('Invalid arguments');
    // lock
    return await this.ctx.meta.util.lock({
      resource: `${__ThisModule__}.messageClass.register`,
      fn: async () => {
        return await this.ctx.meta.util.executeBeanIsolate({
          beanModule: __ThisModule__,
          fn: async ({ ctx }) => {
            return await ctx.bean.io.messageClass._registerLock({ module, messageClassName });
          },
        });
      },
    });
  }

  async _registerLock({ module, messageClassName }: any) {
    // get
    const res = await this.modelMessageClass.get({ module, messageClassName });
    if (res) return res;
    // data
    const messageClass = this.messageClass({ module, messageClassName });
    if (!messageClass) throw new Error(`messageClass ${module}:${messageClassName} not found!`);
    const data: any = {
      module,
      messageClassName,
      uniform: messageClass.info.uniform ? 1 : 0,
    };
    // insert
    const res2 = await this.modelMessageClass.insert(data);
    data.id = res2.insertId;
    return data;
  }

  messageClasses() {
    if (!_cacheMessageClasses[this.ctx.locale]) {
      _cacheMessageClasses[this.ctx.locale] = this._prepareMessageClasses();
    }
    return _cacheMessageClasses[this.ctx.locale];
  }

  messageClass({ module, messageClassName }: any) {
    const _messageClasses = this.messageClasses();
    return _messageClasses[module] && _messageClasses[module][messageClassName];
  }

  _prepareMessageClasses() {
    const messageClasses: any = {};
    for (const relativeName in this.ctx.app.meta.modules) {
      const module = this.ctx.app.meta.modules[relativeName];
      if (module.meta && module.meta.socketio && module.meta.socketio.messages) {
        const res = this._prepareMessageClassesModule(relativeName, module.meta.socketio.messages);
        if (Object.keys(res).length > 0) {
          messageClasses[relativeName] = res;
        }
      }
    }
    return messageClasses;
  }

  _prepareMessageClassesModule(moduleName, _messages) {
    const messageClasses: any = {};
    for (const key in _messages) {
      const message = this.ctx.bean.util.extend({}, _messages[key]);
      message.info.name = key;
      // titleLocale
      message.info.titleLocale = this.ctx.text(message.info.title);
      // bean
      if (message.info.bean) {
        message.info.beanFullName = this.bean.util.combineBeanFullName({
          module: moduleName,
          scene: 'io.message',
          bean: message.info.bean,
        });
      }
      // ok
      messageClasses[key] = message;
    }
    return messageClasses;
  }

  channels() {
    if (!_cacheChannels[this.ctx.locale]) {
      _cacheChannels[this.ctx.locale] = this._prepareChannels();
    }
    return _cacheChannels[this.ctx.locale];
  }

  // string/object
  channel(channelFullName) {
    let module, channelName;
    if (typeof channelFullName === 'string') {
      [module, channelName] = channelFullName.split(':');
    } else {
      module = channelFullName.module;
      channelName = channelFullName.channelName;
    }
    const _channels = this.channels();
    return _channels[module] && _channels[module][channelName];
  }

  _prepareChannels() {
    const channels: any = {};
    for (const relativeName in this.ctx.app.meta.modules) {
      const module = this.ctx.app.meta.modules[relativeName];
      if (module.meta && module.meta.socketio && module.meta.socketio.channels) {
        const res = this._prepareChannelsModule(relativeName, module.meta.socketio.channels);
        if (Object.keys(res).length > 0) {
          channels[relativeName] = res;
        }
      }
    }
    return channels;
  }

  _prepareChannelsModule(moduleName, _channels) {
    const channels: any = {};
    for (const key in _channels) {
      const channel = this.ctx.bean.util.extend({}, _channels[key]);
      channel.info.name = key;
      // titleLocale
      channel.info.titleLocale = this.ctx.text(channel.info.title);
      // bean
      if (channel.info.bean) {
        channel.info.beanFullName = this.bean.util.combineBeanFullName({
          module: moduleName,
          scene: 'io.channel',
          bean: channel.info.bean,
        });
      }
      // ok
      channels[key] = channel;
    }
    return channels;
  }
}
