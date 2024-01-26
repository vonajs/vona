import { __ThisModule__ } from '../resource/this.js';
import { Bean } from '@cabloy/core';
import { BeanIoMessageBase } from 'cabloy-module-api-a-socketio';

@Bean({ scene: 'io.message' })
export class IoMessageMail extends BeanIoMessageBase {
  async onChannelRender({ channelFullName, options, message, messageSync, messageClass }) {
    if (channelFullName === 'a-mail:mail') {
      return await this._onChannelRenderMail({ options, message, messageSync, messageClass });
    }
    // super
    return await super.onChannelRender({ channelFullName, options, message, messageSync, messageClass });
  }

  async _onChannelRenderMail({ message }) {
    const content = JSON.parse(message.content);
    const modelMail = this.ctx.model.module(__ThisModule__).mail;
    const mail = await modelMail.get({ id: content.mailId });
    return {
      scene: mail.scene,
      message: JSON.parse(mail.message),
    };
  }
}
