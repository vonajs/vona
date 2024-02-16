import { Bean, BeanBase } from '@cabloy/core';

@Bean({ scene: 'test' })
export class TestApp extends BeanBase {
  actionSync({ a, b }: any) {
    return a + b;
  }

  async actionAsync({ a, b }: any) {
    return Promise.resolve(a + b);
  }
}
