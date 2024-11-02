import path from 'path';
import { AppWorkerLoader, AgentWorkerLoader } from 'egg';
import { getEnvFiles, loadEnvs } from '@cabloy/dotenv';
import { extend } from '@cabloy/extend';
import { VonaMetaMode } from 'vona-shared';

function createLoaderClass(Base) {
  return class LoaderClass extends Base {
    pkgVona: any = null;

    loadConfig() {
      super.loadConfig();
      this._loadEnvAndConfig();
      this.app.subdomainOffset = typeof this.config.subdomainOffset === 'undefined' ? 2 : this.config.subdomainOffset;
    }

    getAppname() {
      if (!this.pkgVona) {
        this.pkgVona = require(path.join(process.cwd(), 'package.json'));
        this.pkg.name = this.pkgVona.name;
      }
      return this.pkgVona.name;
    }

    _loadEnvAndConfig() {
      // load envs
      const mode: VonaMetaMode = this.serverEnv;
      const meta = {
        flavor: this.app.options.flavor || 'normal',
        mode,
        mine: 'mine',
      };
      const projectPath = path.join(this.options.baseDir, '../..');
      const envDir = path.join(projectPath, 'env');
      loadEnvs(meta, envDir, '.env');
      // load config
      const configDir = path.join(this.options.baseDir, 'config/config');
      const files = getEnvFiles(meta, configDir, 'config', '.js');
      if (!files) return;
      const target = this.config;
      for (const file of files) {
        const config = this.loadFile(file, this.appInfo);
        if (config) {
          extend(true, target, config);
        }
      }
    }
  };
}

export const CustomAppWorkerLoader = createLoaderClass(AppWorkerLoader);
export const CustomAgentWorkerLoader = createLoaderClass(AgentWorkerLoader);
