import type { IDecoratorBeanOptionsBase, TypeModuleResourceConfig } from 'vona';
import path from 'node:path';
import { parseInfoFromPath } from '@cabloy/module-info';
import { appHmrDeps, appResource, BeanBase, deepExtend, pathToHref, SymbolBeanContainerInstances, SymbolBeanInstancePropsLazy, SymbolHmrStateLoad, SymbolHmrStateSave } from 'vona';
import { Service } from 'vona-module-a-bean';

@Service()
export class ServiceHmr extends BeanBase {
  async reloadFile(sceneName: string, file: string) {
    const moduleInfo = parseInfoFromPath(path.dirname(file));
    const moduleName = moduleInfo?.relativeName;
    const fileUrl = `${pathToHref(file)}?${Date.now()}`;
    const fileModule = await import(fileUrl);
    if (sceneName === '_error') {
      await this._reloadError(moduleName!, fileModule.errors);
    } else if (sceneName === '_locale') {
      await this._reloadLocale(moduleName!, fileModule.default, file);
    } else if (sceneName === '_config') {
      await this._reloadConfig(moduleName!, fileModule.config);
    } else if (sceneName === '_constant') {
      await this._reloadConstant(moduleName!, fileModule.constants);
    } else {
      await this._reloadBeanWrapper(fileModule);
    }
  }

  private async _reloadError(moduleName: string, errors: {}) {
    deepExtend(this.app.meta.error.ebErrors[moduleName], errors);
  }

  private async _reloadLocale(moduleName: string, moduleLocales: {}, file: string) {
    const locale = path.basename(file, '.ts');
    // localeModules
    if (!this.app.meta.localeModules[moduleName]) this.app.meta.localeModules[moduleName] = {};
    this.app.meta.localeModules[moduleName][locale] = Object.assign(
      {},
      moduleLocales,
      this.app.meta.hmrCacheLocaleModules[moduleName]?.[locale],
    );
  }

  private async _reloadConfig(moduleName: string, config: TypeModuleResourceConfig) {
    const app = this.app;
    const configModule = await config(app, app.options.env);
    await app.util.monkeyModule(app.meta.appMonkey, app.meta.modulesMonkey, 'configLoaded', app.meta.modules[moduleName], configModule);
    // app config
    app.config.modules[moduleName] = deepExtend(
      {},
      configModule,
      app.meta.hmrCacheConfigModules[moduleName],
    );
    // instance config
    await this.$scope.instance.service.instance.resetAllCaches();
  }

  private async _reloadConstant(moduleName: string, constants: {}) {
    deepExtend(this.app.meta.constants[moduleName], constants);
  }

  private async _reloadBeanWrapper(fileModule: any) {
    for (const key in fileModule) {
      const item = fileModule[key];
      if (typeof item !== 'function') continue;
      const beanOptions = appResource.getBean(item);
      if (!beanOptions) continue;
      const beanFullName = beanOptions.beanFullName;
      if (appHmrDeps.deps[beanFullName] && appHmrDeps.deps[beanFullName].size > 0) {
        this.app.bean.worker.reloadAll();
      } else {
        await this._reloadBean(beanOptions.beanFullName);
      }
    }
  }

  private async _reloadBean(beanFullName: string) {
    const beanOptions = appResource.getBean(beanFullName)!;
    await this._reloadBeanInstances(beanOptions);
    this._reloadBeanInstanceProps(beanOptions);
  }

  private async _reloadBeanInstances(beanOptions: IDecoratorBeanOptionsBase) {
    const { scene, beanFullName } = beanOptions;
    const beanContainer = this.app.bean;
    const recordBeanInstances = this.app.meta.hmr!.recordBeanInstances[beanFullName];
    if (!recordBeanInstances) return;
    this.app.meta.hmr!.recordBeanInstances[beanFullName] = [];
    for (const { beanInstanceKey, withSelector, args } of recordBeanInstances) {
      // dispose
      const beanInstanceOld: any = beanContainer[SymbolBeanContainerInstances][beanInstanceKey];
      const state = beanInstanceOld[SymbolHmrStateSave]?.();
      await beanContainer.disposeInstance(beanInstanceKey);
      // new
      const beanInstanceNew: any = beanContainer._getBeanSelectorInner(beanFullName, withSelector, ...args);
      beanInstanceNew[SymbolHmrStateLoad]?.(state);
      // scope
      // 需要参考beanScopeBase中的逻辑，依次完成清理工作
      //  error/locale或许也可以实现hmr
      if (scene === 'service') {
        const scope: any = beanContainer.scope(beanOptions.module as never);
        const scopeItems = scope?.__scenes[scene]?.__instances;
        if (scopeItems?.[beanOptions.name]) {
          delete scopeItems?.[beanOptions.name];
        }
      }
    }
  }

  private _reloadBeanInstanceProps(beanOptions: IDecoratorBeanOptionsBase) {
    const { beanFullName } = beanOptions;
    const recordBeanInstanceProps = this.app.meta.hmr!.recordBeanInstanceProps[beanFullName];
    if (!recordBeanInstanceProps) return;
    this.app.meta.hmr!.recordBeanInstanceProps[beanFullName] = [];
    for (const { beanInstance, prop } of recordBeanInstanceProps) {
      delete beanInstance[SymbolBeanInstancePropsLazy][prop];
    }
  }
}
