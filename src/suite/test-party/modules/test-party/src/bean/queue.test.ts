import { Bean, BeanBase } from '@cabloy/core';

@Bean({ scene: 'queue' })
export class QueueTest extends BeanBase {
  async execute(context) {
    const data = context.data;
    return data.a + data.b;
  }
}
