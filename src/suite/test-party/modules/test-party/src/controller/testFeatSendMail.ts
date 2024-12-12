import { BeanBase, Controller } from 'vona';

@Controller()
export class ControllerTestFeatSendMail extends BeanBase {
  async sendMail() {
    // send
    const message = this.ctx.request.body.data;
    await this.app.bean.mail.send({
      scene: 'test',
      message,
    });
    // done
    this.app.success();
  }
}
