import { CabloyApplication } from '../../types/index.js';
import LoadModulesFn from '../module';

export class Bootstrap {
  app: CabloyApplication;

  constructor(app) {
    this.app = app;
  }

  loadModules() {
    LoadModulesFn(this);
  }
}
