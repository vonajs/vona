import { ScopeModule } from '../resource/this.js';
import { Bean } from '@cabloy/core';
import { BeanIoMessageBase } from 'cabloy-module-api-a-socketio';

@Bean({ scene: 'io.message' })
export class IoMessageMail extends BeanIoMessageBase<ScopeModule> {
  async onChannelRender({ channelFullName, options, message, messageSync, messageClass }: any) {
    if (channelFullName === 'a-mail:mail') {
      return await this._onChannelRenderMail({ options, message, messageSync, messageClass });
    }
    // super
    return await super.onChannelRender({ channelFullName, options, message, messageSync, messageClass });
  }

  async _onChannelRenderMail({ message }: any) {
    const content = JSON.parse(message.content);
    const modelMail = this.scope.model.mail;
    const mail = await modelMail.get({ id: content.mailId });
    if (!mail) return;
    return {
      scene: mail.scene,
      message: JSON.parse(mail.message),
    };
  }
}
