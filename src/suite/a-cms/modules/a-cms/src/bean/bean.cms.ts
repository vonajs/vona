import { Bean, BeanBase } from 'vona';
import { ServiceBuild, ServiceRender, ServiceSite } from '../index.js';

@Bean()
export class BeanCms extends BeanBase {
  get render() {
    return this.ctx.bean._getBean(ServiceRender);
  }

  get site() {
    return this.ctx.bean._getBean(ServiceSite);
  }

  build({ atomClass }: any) {
    return this.ctx.bean._newBean(ServiceBuild, atomClass);
  }
}
