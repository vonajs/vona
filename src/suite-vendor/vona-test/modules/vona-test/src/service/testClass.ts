import { BeanBase, Service } from 'vona';

class ClassBeanBase extends BeanBase {
  actionSync({ a, b }: any) {
    return a + b;
  }
}

@Service()
export class ServiceTestClass extends ClassBeanBase {
  async actionAsync({ a, b }: any) {
    return Promise.resolve(a + b);
  }
}
