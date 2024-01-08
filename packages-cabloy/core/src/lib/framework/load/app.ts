import path from 'path';
import { AppWorkerLoader } from 'egg';
import LoadModulesFn from '../../module';
import ModuleInfoFn from '../moduleInfo.js';

export class CustomAppWorkerLoader extends AppWorkerLoader {
  // constructor(opt) {
  //   super(opt);
  // }

  private pkgCabloy: any = null;

  loadConfig() {
    super.loadConfig();
    this.app.subdomainOffset = typeof this.config.subdomainOffset === 'undefined' ? 2 : this.config.subdomainOffset;
    ModuleInfoFn(this.app);
  }
  load() {
    super.load();
    // load modules
    LoadModulesFn(this);
  }
  getAppname() {
    if (!this.pkgCabloy) {
      this.pkgCabloy = require(path.join(process.cwd(), 'package.json'));
      this.pkg.name = this.pkgCabloy.name;
    }
    return this.pkgCabloy.name;
  }
}
