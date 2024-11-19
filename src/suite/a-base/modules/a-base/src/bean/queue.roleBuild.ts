import { Bean, BeanBase } from 'vona';

@Bean({ scene: 'queue' })
export class QueueRoleBuild extends BeanBase {
  async execute(context) {
    const { options } = context.data;
    await this.app.bean.role._buildQueue(options);
  }
}
