import type { VonaMetaMode } from '@cabloy/module-info';
import { createRequire } from 'node:module';
import path from 'node:path';

export function createLoaderClass(Base) {
  return class LoaderClass extends Base {
    pkgVona: any = null;

    loadPlugin() {
      // do nothing
    }

    loadMiddleware(_opt: any) {
      // do nothing
    }

    loadConfig() {
      // meta
      const mode: VonaMetaMode = this.serverEnv;
      // use process.env.META_FLAVOR for test
      const meta = {
        flavor: this.app.options.flavor || process.env.META_FLAVOR || 'normal',
        mode,
        mine: 'mine',
      };
      // load envs
      this._loadAppEnvs(meta);
      // load super config
      super.loadConfig();
      // load app config
      this._loadAppConfig(meta);
      // configMeta
      this.config.configMeta = {
        flavor: meta.flavor,
        mode: meta.mode,
      };
      // subdomainOffset
      this.app.subdomainOffset = typeof this.config.subdomainOffset === 'undefined' ? 2 : this.config.subdomainOffset;
    }

    getAppname() {
      if (!this.pkgVona) {
        const require = createRequire(import.meta.url);
        this.pkgVona = require(path.join(process.cwd(), 'package.json'));
        this.pkg.name = this.pkgVona.name;
      }
      return this.pkgVona.name;
    }
  };
}
