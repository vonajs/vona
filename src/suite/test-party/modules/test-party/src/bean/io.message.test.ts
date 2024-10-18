import { Bean } from 'vona';
import { BeanIoMessageBase } from 'cabloy-module-api-a-socketio';

@Bean({ scene: 'io.message' })
export class IoMessageTest extends BeanIoMessageBase {
  async onSaveSync({ path, options, message, messageSync, messageClass }: any) {
    // options
    const messageScene = (options && options.scene) || '';
    // send back
    if (messageSync.messageDirection === 1 && message.userIdTo === 0) {
      const content = JSON.parse(message.content);
      const _message = {
        messageType: message.messageType,
        messageFilter: message.messageFilter,
        messageGroup: message.messageGroup,
        messageScene,
        userIdFrom: 0,
        userIdTo: messageSync.userId,
        content: {
          text: `Reply: ${content.text}`,
        },
      };
      await this.ctx.bean.io.publish({ path, message: _message, messageClass, options });
    }
    return await super.onSaveSync({ path, options, message, messageSync, messageClass });
  }
}
