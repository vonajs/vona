import path from 'path';
import { AppWorkerLoader, AgentWorkerLoader } from 'egg';
import { loadEnvs } from '@cabloy/dotenv';

function createLoaderClass(Base) {
  return class LoaderClass extends Base {
    pkgCabloy: any = null;

    loadConfig() {
      super.loadConfig();
      this._loadEnvAndConfig();
      this.app.subdomainOffset = typeof this.config.subdomainOffset === 'undefined' ? 2 : this.config.subdomainOffset;
    }

    getAppname() {
      if (!this.pkgCabloy) {
        this.pkgCabloy = require(path.join(process.cwd(), 'package.json'));
        this.pkg.name = this.pkgCabloy.name;
      }
      return this.pkgCabloy.name;
    }

    _loadEnvAndConfig() {
      // load envs
      const meta = { serverEnv: this.serverEnv, mine: 'mine' };
      const projectPath = path.join(this.options.baseDir, '../..');
      const envDir = path.join(projectPath, 'env');
      const envs = loadEnvs(meta, envDir, '.env');
      console.log(envs);
    }
  };
}

export const CustomAppWorkerLoader = createLoaderClass(AppWorkerLoader);
export const CustomAgentWorkerLoader = createLoaderClass(AgentWorkerLoader);
