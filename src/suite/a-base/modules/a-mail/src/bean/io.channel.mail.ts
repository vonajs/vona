import { Bean } from 'vona';
import { BeanIoChannelBase } from 'vona-module-a-socketio';

import nodemailer from 'nodemailer';
import chalk from 'chalk';
import boxen from 'boxen';

const boxenOptions: boxen.Options = {
  padding: 1,
  margin: 1,
  align: 'center',
  borderColor: 'yellow',
  borderStyle: 'round',
} as boxen.Options;

@Bean({ scene: 'io.channel' })
export class IoChannelMail extends BeanIoChannelBase {
  async onPush({ content /* options, message, messageSync, messageClass*/ }: any) {
    // check if content.message
    // not set content.message.to dynamic for test, which must be set by business
    if (!content.message || !content.message.to) return false;
    // scene
    let scene;
    let sceneTest = false;
    // 1. maybe object by dynamic
    if (content.scene && typeof content.scene === 'object') {
      scene = content.scene;
    } else {
      // 2. from config cache
      scene = this.ctx.bean.mailSceneCache.getMailSceneConfigCache(content.scene || 'system');
    }
    // 3. test
    if (!this._sceneValid(scene) && (this.ctx.app.meta.isTest || this.ctx.app.meta.isLocal)) {
      scene = await this._createSceneTest();
      sceneTest = true;
    }
    // check if empty
    if (!this._sceneValid(scene)) {
      const message = chalk.keyword('orange')(this.ctx.text('mailhostNotConfigAlert'));
      console.log('\n' + boxen(message, boxenOptions));
      return false;
    }
    // transporter
    const transporter = nodemailer.createTransport(scene.transport, scene.defaults);
    // send
    const res = await transporter.sendMail(content.message);
    // log
    if (sceneTest) {
      const url = nodemailer.getTestMessageUrl(res);
      const message =
        chalk.keyword('cyan')('Test Mail To: ') +
        chalk.keyword('yellow')(content.message.to) +
        chalk.keyword('orange')('\n' + url);
      console.log('\n' + boxen(message, boxenOptions));
    }
    // done
    return true;
  }

  async _createSceneTest() {
    const account = await nodemailer.createTestAccount();
    return {
      transport: {
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
        logger: false,
        debug: false,
      },
      defaults: {
        // sender info
        from: 'Nodemailer <example@nodemailer.com>',
      },
    };
  }

  _sceneValid(scene) {
    return scene && scene.transport && scene.transport.host;
  }
}
