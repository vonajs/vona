import { __ThisModule__ } from '../resource/this.js';
import { Bean, BeanModuleScopeBase } from '@cabloy/core';

@Bean()
export class BeanMail extends BeanModuleScopeBase {
  get modelMail() {
    return this.ctx.model.module(__ThisModule__).mail;
  }

  // send
  async send({ scene, message }: any) {
    // save to db
    const res = await this.modelMail.insert({
      scene,
      status: 0,
      mailto: message.to,
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
