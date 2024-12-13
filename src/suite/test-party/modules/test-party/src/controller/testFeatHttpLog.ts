import { BeanBase } from 'vona';
import { Controller } from 'vona-module-a-web';

@Controller()
export class ControllerTestFeatHttpLog extends BeanBase {
  async httpLog() {
    // please see: {projectDir}/src/backend/logs/{projectName}/{projectName}-web.log
    this.app.success('this is a test for httpLog');
  }
}
