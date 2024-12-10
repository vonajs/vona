import chalk from 'chalk';
import {
  BeanBase,
  ConfigInstanceBase,
  IInstanceStartupOptions,
  IMetaVersionInit,
  IMetaVersionTest,
  IMetaVersionUpdate,
  Service,
} from 'vona';
import { __ThisModule__ } from '../.metadata/this.js';
import { EntityVersion } from '../entity/version.js';
import { EntityVersionInit } from '../entity/versionInit.js';

@Service()
export class ServiceVersion extends BeanBase {
  async instanceInitStartup(options?: IInstanceStartupOptions) {
    const instanceBase = options?.configInstanceBase;
    await this.__instanceInit(this.ctx.subdomain, instanceBase);
  }

  async __start() {
    // update all modules
    try {
      const result = await this.__check({ scene: null });
      // clear columns cache
      this.bean.model.columnsClearAll();
      // broadcast
      this.app.meta.broadcast.emit({
        module: __ThisModule__,
        broadcastName: 'columnsClear',
        data: { mode: 'all' },
      });
      // log
      if (Object.keys(result).length > 0) console.log(result);
      console.log(chalk.cyan('  All modules are checked successfully!'));
    } catch (err) {
      console.log(chalk.cyan('  Modules are checked failed!'));
      throw err;
    }
  }

  async __instanceInit(subdomain: string, instanceBase?: ConfigInstanceBase) {
    try {
      const optionsInit = Object.assign({}, instanceBase, { scene: 'init', subdomain });
      await this.__check(optionsInit);
      console.log(chalk.cyan(`  The instance is initialized successfully: ${subdomain || 'default'}`));
    } catch (err) {
      console.log(chalk.cyan(`  The instance is initialized failed: ${subdomain || 'default'}`));
      throw err;
    }
  }

  async __instanceTest(subdomain) {
    await this.__check({ scene: 'test', subdomain });
  }

  // scene: null/init/test
  async __check(options) {
    options.result = {};

    if (!options.scene) {
      // confirm table aVersion exists
      const hasTableVersion = await this.bean.model.schema.hasTable('aVersion');
      if (!hasTableVersion) {
        await this.bean.model.createTable('aVersion', function (table) {
          table.basicFields({ deleted: false, iid: false });
          table.string('module', 50);
          table.integer('version');
        });
      }
    }

    // check all modules
    const debug = this.app.bean.debug.get('version');
    for (const module of this.app.meta.modulesArray) {
      debug('check module: %s, scene:%s', module.info.relativeName, options.scene);
      await this.__checkModule(module.info.relativeName, options);
    }

    // check if role dirty for init/test
    if (options.scene === 'init' || options.scene === 'test') {
      await this.ctx.meta.util.executeBean({
        subdomain: options.subdomain,
        beanFullName: `${__ThisModule__}.service.version`,
        fn: '__after',
      });
    }

    // ok
    return options.result;
  }

  // check module
  async __checkModule(moduleName, options) {
    // module
    const module = this.__getModule(moduleName);

    // fileVersionNew
    let fileVersionNew = 0;
    if (module.package.vonaModule && module.package.vonaModule.fileVersion) {
      fileVersionNew = module.package.vonaModule.fileVersion;
    }

    if (fileVersionNew && (!options.scene || options.scene === 'init')) {
      // update module or init module

      // -1: always
      if (fileVersionNew === -1) {
        await this.__updateModule(options, module, -1, -1);
      } else {
        // fileVersionOld
        let fileVersionOld = 0; // default
        if (!options.scene) {
          const res = await this.bean.model
            .builder<EntityVersion>('aVersion')
            .select('*')
            .where('module', moduleName)
            .orderBy('version', 'desc')
            .first();
          if (res) {
            fileVersionOld = res.version;
          }
        } else {
          const res = await this.bean.model
            .builder<EntityVersionInit>('aVersionInit')
            .select('*')
            .where({ subdomain: options.subdomain, module: moduleName })
            .orderBy('version', 'desc')
            .first();
          if (res) {
            fileVersionOld = res.version;
          }
        }

        // check if need update
        if (fileVersionOld > fileVersionNew) {
          this.app.throw(1001, moduleName);
        } else {
          // not check if (fileVersionOld < fileVersionNew)
          await this.__updateModule(options, module, fileVersionOld, fileVersionNew);
        }
      }
    }

    if (options.scene === 'test') {
      // test module
      await this.ctx.meta.util.executeBean({
        subdomain: options.subdomain,
        beanModule: module.info.relativeName,
        transaction: true,
        fn: async () => {
          await this.__testModuleTransaction(module, fileVersionNew, options);
        },
      });
    }
  }

  // update module or init module
  async __updateModule(options, module, fileVersionOld, fileVersionNew) {
    if (fileVersionNew === -1) {
      // always
      await this.__updateModule2(options, module, -1);
    } else {
      // versions
      //   always version:0
      const versions = [0];
      for (let version = fileVersionOld + 1; version <= fileVersionNew; version++) {
        versions.push(version);
      }
      // loop
      const debug = this.app.bean.debug.get('version');
      for (const version of versions) {
        debug('update module: %s, version: %d, scene:%s', module.info.relativeName, version, options.scene);
        await this.__updateModule2(options, module, version);
      }
    }

    // log
    if (fileVersionOld !== fileVersionNew) {
      options.result[module.info.relativeName] = { fileVersionOld, fileVersionNew };
    }
  }

  async __updateModule2(options, module, version) {
    // perform action
    try {
      if (!options.scene) {
        // update
        await this.bean.executor.newCtx(
          async () => {
            await this.__updateModuleTransaction(module, version);
          },
          {
            transaction: module.name !== 'a-index',
          },
        );
      } else {
        // init
        await this.bean.executor.newCtx(
          async () => {
            await this.__initModuleTransaction(module, version, options);
          },
          {
            subdomain: options.subdomain,
            transaction: true,
          },
        );
      }
    } catch (err) {
      throw err;
    }
  }

  async __updateModuleTransaction(module, version) {
    // bean
    const beanVersion = this.__getBeanVersion<IMetaVersionUpdate>(module.info.relativeName, true);
    if (!beanVersion.update) throw new Error(`meta.version.update not exists for ${module.info.relativeName}`);
    // clear columns cache
    this.bean.model.columnsClearAll();
    // execute
    await beanVersion.update({ version });
    // insert record
    if (version > 0) {
      await this.bean.model.builder<EntityVersion>('aVersion').insert({ module: module.info.relativeName, version });
    }
  }

  async __initModuleTransaction(module, version, options) {
    // bean
    const beanVersion = this.__getBeanVersion<IMetaVersionInit>(module.info.relativeName, true);
    // execute
    if (beanVersion.init) {
      await beanVersion.init({ ...options, version });
    }
    // insert record
    if (version > 0) {
      await this.bean.model.insert(
        'aVersionInit',
        {
          subdomain: options.subdomain,
          module: module.info.relativeName,
          version,
        },
        { disableInstance: true, disableDeleted: true },
      );
    }
  }

  // test module
  async __testModuleTransaction(module, version, options) {
    // bean
    const beanVersion = this.__getBeanVersion<IMetaVersionTest>(module.info.relativeName, false);
    // execute
    if (beanVersion && beanVersion.test) {
      await beanVersion.test({ ...options, version });
    }
  }

  protected async __after() {
    await this.app.bean.role.build();
  }

  // get module
  private __getModule(moduleName: string) {
    return this.app.meta.modules[moduleName];
  }

  private __getBeanVersion<T>(moduleName: string, throwErrorIfEmpty: boolean): T {
    // bean
    let beanVersion = this.bean._getBean(`${moduleName}.meta.version` as any);
    if (!beanVersion) {
      // todo: remove version.manager
      beanVersion = <any>this.bean._getBean(`${moduleName}.version.manager` as any);
      if (!beanVersion && throwErrorIfEmpty) throw new Error(`meta.version not exists for ${moduleName}`);
    }
    return beanVersion;
  }
}
