import { BeanBase } from 'vona';
import { Aspect } from 'vona-module-a-aspect';
import { Service } from 'vona-module-a-web';

class ServiceAopMethodBase extends BeanBase {
  @Aspect.aopMethod('vona-test:test', { wrapper: '+' })
  @Aspect.aopMethod('vona-test:test', { wrapper: '-' })
  testSyncBase() {
    return 'hello';
  }
}

@Service()
export class ServiceAopMethod extends ServiceAopMethodBase {
  private _name: string = '';

  @Aspect.aopMethod('vona-test:test', { wrapper: '+' })
  @Aspect.aopMethod('vona-test:test', { wrapper: '-' })
  testSync() {
    return 'hello';
  }

  @Aspect.aopMethod('vona-test:test', { wrapper: '+' })
  @Aspect.aopMethod('vona-test:test', { wrapper: '-' })
  async testAsync() {
    return 'hello';
  }

  @Aspect.aopMethod('vona-test:test', { wrapper: '+' })
  @Aspect.aopMethod('vona-test:test', { wrapper: '-' })
  get name() {
    return this._name;
  }

  set name(value) {
    this._name = value;
  }
}
