import { Bean, BeanBase } from 'vona';
import { LocalBuild, LocalRender, LocalSite } from '../index.js';

@Bean()
export class BeanCms extends BeanBase {
  get render() {
    return this.ctx.bean._getBean(LocalRender);
  }

  get site() {
    return this.ctx.bean._getBean(LocalSite);
  }

  build({ atomClass }: any) {
    return this.ctx.bean._newBean(LocalBuild, atomClass);
  }
}
