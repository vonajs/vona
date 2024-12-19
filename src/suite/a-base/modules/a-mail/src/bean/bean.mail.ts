import { Bean } from 'vona-module-a-bean';
import { __ThisModule__ } from '../.metadata/this.js';
import { BeanModuleScopeBase } from 'vona';

@Bean()
export class BeanMail extends BeanModuleScopeBase {
  get modelMail() {
    return this.scope.model.mail;
  }

  // send
  async send({ scene, message }: any) {
    // save to db
    const res = await this.modelMail.insert({
      scene,
      status: 0,
      mailTo: message.to,
      mailSubject: message.subject,
      message: JSON.stringify(message),
    });
    const mailId = res[0];
    // publish
    this.ctx.tail(async () => {
      await this.app.bean.io.publish({
        message: {
          content: { mailId },
        },
        messageClass: {
          module: __ThisModule__,
          messageClassName: 'mail',
        },
      });
    });
  }
}
