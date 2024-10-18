import { Bean, BeanBase } from 'vona';

@Bean({ scene: 'queue' })
export class QueueTest extends BeanBase {
  async execute(context) {
    const data = context.data;
    return data.a + data.b;
  }
}
