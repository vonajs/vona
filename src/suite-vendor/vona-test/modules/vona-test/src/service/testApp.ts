import { BeanBase, Service } from 'vona';

@Service()
export class ServiceTestApp extends BeanBase {
  actionSync({ a, b }: any) {
    return a + b;
  }

  async actionAsync({ a, b }: any) {
    return Promise.resolve(a + b);
  }
}
