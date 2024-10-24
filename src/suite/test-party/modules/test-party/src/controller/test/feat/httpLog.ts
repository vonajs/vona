import { BeanBase, Controller } from 'vona';
import { ScopeModule } from '../../../.metadata/this.js';

@Controller()
export class ControllerTestFeatHttpLog extends BeanBase<ScopeModule> {
  async httpLog() {
    // please see: {projectDir}/src/backend/logs/{projectName}/{projectName}-web.log
    this.ctx.success('this is a test for httpLog');
  }
}
