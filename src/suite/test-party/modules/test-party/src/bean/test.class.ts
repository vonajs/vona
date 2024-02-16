import { Bean, BeanBase } from '@cabloy/core';

class ClassBeanBase extends BeanBase {
  actionSync({ a, b }: any) {
    return a + b;
  }
}

@Bean({ scene: 'test' })
export class TestClass extends ClassBeanBase {
  async actionAsync({ a, b }: any) {
    return Promise.resolve(a + b);
  }
}
