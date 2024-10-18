import { ScopeModule, __ThisModule__ } from '../resource/this.js';
import { Bean, BeanModuleScopeBase } from 'vona';

@Bean()
export class BeanMail extends BeanModuleScopeBase<ScopeModule> {
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
      await this.ctx.bean.io.publish({
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
