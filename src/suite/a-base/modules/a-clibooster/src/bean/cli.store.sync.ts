import { BeanTemp } from 'vona-module-a-bean';
import { __ThisModule__ } from '../.metadata/this.js';

import path from 'path';
import os from 'os';

import eggBornUtils from 'egg-born-utils';
import AdmZip from 'adm-zip';
import semver from 'semver';
import fse from 'fs-extra';
import { rimraf } from 'rimraf';
import CliStoreBase from '../common/cliStoreBase.js';

@BeanTemp({ scene: 'cli.store' })
export class CliStoreSync extends CliStoreBase {
  constructor() {
    super('sync');
  }

  async onExecuteStoreCommandEntity({ entityName }: any) {
    // fetch entity status
    const entityStatus = await this.openAuthClient.post({
      path: '/cabloy/store/store/sync/entityStatus',
      body: {
        entityName,
      },
    });
    if (!entityStatus) {
      // not found
      return { code: 1001 };
    }
    // prepare licenseMeta
    let licenseMeta;
    if (entityStatus.licenseFull.download) {
      licenseMeta = entityStatus.licenseFull;
    }
    if (!licenseMeta && entityStatus.licenseTrial.download) {
      licenseMeta = entityStatus.licenseTrial;
    }
    if (!licenseMeta) {
      licenseMeta = entityStatus.licenseFull;
    }
    // handle
    const res = await this._onExecuteStoreCommandEntity_handle({ entityName, entityStatus, licenseMeta });
    if (!res) return licenseMeta;
    // combine message
    const args = res.args || [];
    const message1 = this.app.meta.error.parseSuccess(__ThisModule__, res.code, ...args).message;
    let message2 = '';
    if (licenseMeta.code) {
      const args = licenseMeta.args || [];
      message2 = this.app.meta.error.parseSuccess(__ThisModule__, licenseMeta.code, ...args).message;
    }
    // ok
    return {
      code: res.code,
      message: `${message1} ${message2}`,
    };
  }

  async _onExecuteStoreCommandEntity_handle({ entityName, entityStatus, licenseMeta }: any) {
    // entityVersion
    const entityVersion = entityStatus.entity.moduleVersion;
    // entityMeta
    const entityMeta = await this._getEntityMeta({ entityName, entityStatus });
    // check version
    if (entityMeta.version && !semver.lt(entityMeta.version, entityVersion)) {
      // No Changes Found
      return { code: 2001 };
    }
    // check if has download
    if (!licenseMeta.download) {
      return null;
    }
    // download
    const buffer = await this.openAuthClient.getRaw({
      path: licenseMeta.download.replace(/\/a\/file\/file\/download\//, '/cabloy/store/store/sync/download/'),
    });
    // unzip
    const tempPath = await this._unzip({ entityName, buffer });
    // remove old path/files
    await rimraf(entityMeta.root);
    // copy to: suite/module
    if (entityStatus.entity.entityTypeCode === 1) {
      await this._copyToSuite({ tempPath, suiteName: entityName, entityMeta });
    } else {
      await this._copyToModuleIsolate({ tempPath, moduleName: entityName, entityMeta });
    }
    // remove temp path
    await rimraf(tempPath);
    // pnpm install
    this._needReInstallDeps = true;
    // synced
    return { code: 3000, args: [entityVersion] };
  }

  async _copyToSuite({ tempPath, entityMeta }: any) {
    // default
    const zip = new AdmZip(path.join(tempPath, 'default'));
    zip.extractAllTo(entityMeta.root, true);
    // others
    const files = await eggBornUtils.tools.globbyAsync(['*', '!default'], { cwd: tempPath });
    for (const file of files) {
      const zip = new AdmZip(path.join(tempPath, file));
      zip.extractAllTo(path.join(entityMeta.root, 'modules', file), true);
    }
  }

  async _copyToModuleIsolate({ tempPath, entityMeta }: any) {
    await fse.move(tempPath, entityMeta.root, { overwrite: true });
  }

  async _unzip({ entityName, buffer }: any) {
    const tempPath = path.join(os.tmpdir(), entityName);
    await rimraf(tempPath);
    const zip = new AdmZip(buffer);
    zip.extractAllTo(tempPath, true);
    return tempPath;
  }

  _getEntityType({ entityStatus }: any) {
    return entityStatus.entity.entityTypeCode;
  }

  async _getEntityMeta({ entityName, entityStatus }: any) {
    const { argv } = this.context;
    // entityMeta
    const entityType = this._getEntityType({ entityStatus });
    const entityMeta: any = {
      root: path.join(argv.projectPath, entityType === 1 ? 'src/suite-vendor' : 'src/module-vendor', entityName),
    };
    // version
    entityMeta.version = await this._getEntityVersion(entityMeta.root);
    return entityMeta;
  }
  async _getEntityVersion(entityPath) {
    const filePkg = path.join(entityPath, 'package.json');
    const _package = await eggBornUtils.tools.loadJSON(filePkg);
    if (!_package) return null;
    return _package.version;
  }
}
