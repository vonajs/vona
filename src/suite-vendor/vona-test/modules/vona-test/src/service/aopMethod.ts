import { BeanBase } from 'vona';
import { UseAopMethod } from 'vona-module-a-aspect';
import { Service } from 'vona-module-a-web';

class ServiceAopMethodBase extends BeanBase {
  @UseAopMethod('vona-test:test', { wrapper: '-' })
  testSyncBase() {
    return 'hello';
  }
}

@Service()
export class ServiceAopMethod extends ServiceAopMethodBase {
  testSync() {
    return 'hello';
  }
}
