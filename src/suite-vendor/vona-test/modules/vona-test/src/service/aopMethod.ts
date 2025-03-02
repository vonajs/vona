import { BeanBase } from 'vona';
import { UseAopMethod } from 'vona-module-a-aspect';
import { Service } from 'vona-module-a-web';

class ServiceAopMethodBase extends BeanBase {
  @UseAopMethod('vona-test:test', { wrapper: '+' })
  @UseAopMethod('vona-test:test', { wrapper: '-' })
  testSyncBase() {
    return 'hello';
  }
}

@Service()
export class ServiceAopMethod extends ServiceAopMethodBase {
  private _name: string = 'vona';

  @UseAopMethod('vona-test:test', { wrapper: '+' })
  @UseAopMethod('vona-test:test', { wrapper: '-' })
  testSync() {
    return 'hello';
  }

  @UseAopMethod('vona-test:test', { wrapper: '+' })
  @UseAopMethod('vona-test:test', { wrapper: '-' })
  async testAsync() {
    return 'hello';
  }

  @UseAopMethod('vona-test:test', { wrapper: '+' })
  @UseAopMethod('vona-test:test', { wrapper: '-' })
  get name() {
    return this._name;
  }

  set name(value) {
    this._name = value;
  }
}
