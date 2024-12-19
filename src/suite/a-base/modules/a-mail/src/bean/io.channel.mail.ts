import { BeanTemp } from 'vona-module-a-bean';

import { BeanIoChannelBase } from 'vona-module-a-socketio';
import nodemailer from 'nodemailer';
import chalk from 'chalk';
import * as Boxen from 'boxen';

const boxenOptions: Boxen.Options = {
  padding: 1,
  margin: 1,
  align: 'center',
  borderColor: 'yellow',
  borderStyle: 'round',
} as Boxen.Options;

@BeanTemp({ scene: 'io.channel' })
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
      scene = this.app.bean.mailSceneCache.getMailSceneConfigCache(content.scene || 'system');
    }
    // 3. test
    if (!this._sceneValid(scene) && (this.ctx.app.meta.isTest || this.ctx.app.meta.isLocal)) {
      scene = await this._createSceneTest();
      sceneTest = true;
    }
    // check if empty
    if (!this._sceneValid(scene)) {
      const message = chalk.hex('#FF8800')(this.app.text('mailhostNotConfigAlert'));
      console.log('\n' + Boxen.default(message, boxenOptions));
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
        chalk.cyan('Test Mail To: ') + chalk.yellow(content.message.to) + chalk.hex('#FF8800')('\n' + url);
      console.log('\n' + Boxen.default(message, boxenOptions));
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
