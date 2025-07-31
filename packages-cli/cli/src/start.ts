import { createRequire } from 'node:module';
import { CabloyCommand } from '@cabloy/cli';

export class VonaCommand extends CabloyCommand {
  constructor(rawArgv?) {
    super('vona', rawArgv);
    this.version = this._extractPackageVersion();
  }

  private _extractPackageVersion() {
    const require = createRequire(import.meta.url);
    const pkg = require('../package.json');
    return pkg.version;
  }
}
