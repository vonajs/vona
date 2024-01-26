import { Bean, BeanBase } from '@cabloy/core';

@Bean({ scene: 'io.message' })
export class IoMessageMail extends BeanBase {
  async onChannelRender({ channelFullName, options, message, messageSync, messageClass }) {
    if (channelFullName === 'a-mail:mail') {
      return await this._onChannelRenderMail({ options, message, messageSync, messageClass });
    }
    // super
    return await super.onChannelRender({ channelFullName, options, message, messageSync, messageClass });
  }

  async _onChannelRenderMail({ message }) {
    const content = JSON.parse(message.content);
    const modelMail = this.ctx.model.module(moduleInfo.relativeName).mail;
    const mail = await modelMail.get({ id: content.mailId });
    return {
      scene: mail.scene,
      message: JSON.parse(mail.message),
    };
  }
}
