import { Bean } from 'vona-module-a-bean';
import { BeanBase } from 'vona';
import { ServiceBuild, ServiceRender, ServiceSite } from '../index.js';

@Bean()
export class BeanCms extends BeanBase {
  get render() {
    return this.app.bean._getBean(ServiceRender);
  }

  get site() {
    return this.app.bean._getBean(ServiceSite);
  }

  build({ atomClass }: any) {
    return this.app.bean._newBean(ServiceBuild, atomClass);
  }
}
