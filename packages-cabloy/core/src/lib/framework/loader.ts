import path from 'path';
import { AppWorkerLoader, AgentWorkerLoader } from 'egg';
import ModuleInfoFn from './moduleInfo.js';

function createLoaderClass<T>(T) {
  return class LoaderClass extends T {
    pkgCabloy: any = null;

    loadConfig() {
      super.loadConfig();
      this.app.subdomainOffset = typeof this.config.subdomainOffset === 'undefined' ? 2 : this.config.subdomainOffset;
      ModuleInfoFn(this.app);
    }

    getAppname() {
      if (!this.pkgCabloy) {
        this.pkgCabloy = require(path.join(process.cwd(), 'package.json'));
        this.pkg.name = this.pkgCabloy.name;
      }
      return this.pkgCabloy.name;
    }
  };
}

export const CustomAppWorkerLoader = createLoaderClass(AppWorkerLoader);
export const CustomAgentWorkerLoader = createLoaderClass(AgentWorkerLoader);
