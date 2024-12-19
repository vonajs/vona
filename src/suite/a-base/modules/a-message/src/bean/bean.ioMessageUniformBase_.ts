import { Virtual } from 'vona-module-a-bean';
import { __ThisModule__ } from '../.metadata/this.js';

import { BeanIoMessageBase } from 'vona-module-a-socketio';

const __PATH_MESSAGE_UNIFORM = '/a/message/uniform';

@Virtual()
export class BeanIoMessageUniformBase extends BeanIoMessageBase {
  get scopeModuleAMessage() {
    return this.getScope(__ThisModule__);
  }

  async onPublish({ /* path,*/ message, messageClass, options }: any) {
    // onPublish
    return await super.onPublish({ path: __PATH_MESSAGE_UNIFORM, message, messageClass, options });
  }

  async onSaveSync({ path, options, message, messageSync, messageClass }: any) {
    if (messageSync.userId > 0 && messageSync.messageDirection === 2) {
      // user
      const user = { id: messageSync.userId };
      // stats
      this._notify({ messageClass, user });
    }
    return await super.onSaveSync({ path, options, message, messageSync, messageClass });
  }

  async onSetRead({ messageClass, messageIds, all, user }: any) {
    // stats
    if (messageClass) {
      this._notify({ messageClass, user });
    }
    // onPublish
    return await super.onSetRead({ messageClass, messageIds, all, user });
  }

  async onPushEnable(/* { options, message, messageSyncs, messageClass }*/) {
    return true;
  }

  async onChannels({ options, message, messageSync, messageClass }: any) {
    let channels = await super.onChannels({ options, message, messageSync, messageClass });
    if (!channels) {
      channels = this.scopeModuleAMessage.config.socketio.message.push.channels;
    }
    return channels;
  }

  async onChannelRender({ channelFullName, options, message, messageSync, messageClass }: any) {
    if (channelFullName === 'a-mail:mail') {
      return await this._onChannelRenderMail({ channelFullName, options, message, messageSync, messageClass });
    }
    // super
    return await super.onChannelRender({ channelFullName, options, message, messageSync, messageClass });
  }

  async _onChannelRenderMail({ channelFullName, message, messageSync }: any) {
    // user
    const userId = messageSync.userId;
    const user = await this.app.bean.user.get({ id: userId });
    if (!user) {
      this.ctx.logger.info('not found user:', userId);
      return null;
    }
    let to = user.email;
    if (!to && (this.ctx.app.meta.isTest || this.ctx.app.meta.isLocal)) {
      to = `${user.userName}@test.com`;
    }
    if (!to) return null;
    // content
    const content = JSON.parse(message.content);
    // link
    const link = this.app.bean.base.getAbsoluteUrl(`/#!/a/message/autojump?id=${message.id}`);
    // scope
    const scope = {
      user,
      message,
      content,
      info: {
        link,
        siteName: this.ctx.instance.title,
      },
    };
    // config
    const configTemplate = this.scopeModuleAMessage.config.socketio.message.render.templates[channelFullName];
    // subject
    let subject = this.app.text.locale(user.locale as any, configTemplate.subject);
    subject = this.app.bean.util.replaceTemplate(subject, scope);
    // body
    let body = this.app.text.locale(user.locale as any, configTemplate.body);
    body = this.app.bean.util.replaceTemplate(body, scope);
    // message
    const _message = {
      to,
      subject,
      text: body,
    };
    // ok
    return {
      scene: null, // use default
      message: _message,
    };
  }

  _notify({ messageClass, user }: any) {
    if (user.id <= 0) return;
    // stats
    this.app.bean.stats.notify({
      module: __ThisModule__,
      name: 'message',
      nameSub: `${messageClass.module}_${messageClass.messageClassName}`,
      user,
    });
  }
}
