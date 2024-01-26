import { Bean, BeanModuleScopeBase } from '@cabloy/core';

@Bean()
export class BeanMail extends BeanModuleScopeBase {
  get modelMail() {
    return this.ctx.model.module(moduleInfo.relativeName).mail;
  }

  // send
  async send({ scene, message }) {
    // save to db
    const res = await this.modelMail.insert({
      scene,
      status: 0,
      mailto: message.to,
      mailSubject: message.subject,
      message: JSON.stringify(message),
    });
    const mailId = res.insertId;
    // publish
    this.ctx.tail(async () => {
      await this.ctx.bean.io.publish({
        message: {
          content: { mailId },
        },
        messageClass: {
          module: moduleInfo.relativeName,
          messageClassName: 'mail',
        },
      });
    });
  }
}
