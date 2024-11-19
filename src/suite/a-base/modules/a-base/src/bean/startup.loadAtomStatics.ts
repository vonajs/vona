import { Bean, BeanBase } from 'vona';

@Bean({ scene: 'startup' })
export class StartupLoadAtomStatics extends BeanBase {
  async execute() {
    await this.app.bean.atomStatic.loadAllAtomStatics();
  }
}
