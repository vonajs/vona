import type { IDecoratorBeanOptionsBase } from '../decorator/interface/beanOptions.ts';
import path from 'node:path';
import { parseInfoFromPath } from '@cabloy/module-info';
import { cast } from '../../types/utils/cast.ts';
import { SymbolBeanContainerInstances, SymbolBeanInstancePropsLazy } from '../bean/beanContainer.ts';
import { BeanSimple } from '../bean/beanSimple.ts';
import { deepExtend, pathToHref } from '../utils/util.ts';
import { appHmrDeps } from './hmrDeps.ts';
import { appResource } from './resource.ts';

interface IRecordBeanInstance {
  beanInstanceKey: string;
  withSelector?: boolean;
  args: any[];
}

interface IRecordBeanInstanceProp {
  beanInstance: any;
  prop: string;
}

export const SymbolHmrStateSave = Symbol('SymbolHmrStateSave');
export const SymbolHmrStateLoad = Symbol('SymbolHmrStateLoad');

export class AppHmr extends BeanSimple {
  private recordBeanInstances: Record<string, IRecordBeanInstance[] | undefined> = {};
  private recordBeanInstanceProps: Record<string, IRecordBeanInstanceProp[] | undefined> = {};

  addBeanInstance(beanFullName: string, beanInstanceKey: string, args: any[], withSelector?: boolean) {
    if (!this.recordBeanInstances[beanFullName]) {
      this.recordBeanInstances[beanFullName] = [];
    }
    this.recordBeanInstances[beanFullName].push({
      beanInstanceKey,
      withSelector,
      args,
    });
  }

  addBeanInstanceProp(beanInstance: any, prop: string, targetBeanFullName: string) {
    if (!this.recordBeanInstanceProps[targetBeanFullName]) {
      this.recordBeanInstanceProps[targetBeanFullName] = [];
    }
    this.recordBeanInstanceProps[targetBeanFullName].push({
      beanInstance,
      prop,
    });
  }

  async reloadFile(sceneName: string, file: string) {
    const moduleInfo = parseInfoFromPath(path.dirname(file));
    const moduleName = moduleInfo?.relativeName;
    const fileUrl = `${pathToHref(file)}?${Date.now()}`;
    const fileModule = await import(fileUrl);
    if (sceneName === '_error') {
      await this._reloadError(moduleName!, fileModule.errors);
    } else if (sceneName === '_locale') {
      await this._reloadLocale(moduleName!, fileModule.default, file);
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
      this.app.meta.localeModulesAppCache[moduleName]?.[locale],
    );
  }

  private async _reloadBeanWrapper(fileModule: any) {
    for (const key in fileModule) {
      const item = fileModule[key];
      if (typeof item !== 'function') continue;
      const beanOptions = appResource.getBean(item);
      if (!beanOptions) continue;
      const beanFullName = beanOptions.beanFullName;
      if (appHmrDeps.deps[beanFullName] && appHmrDeps.deps[beanFullName].size > 0) {
        cast(this.app.bean).worker.reloadAll();
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
    const recordBeanInstances = this.recordBeanInstances[beanFullName];
    if (!recordBeanInstances) return;
    this.recordBeanInstances[beanFullName] = [];
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
    const recordBeanInstanceProps = this.recordBeanInstanceProps[beanFullName];
    if (!recordBeanInstanceProps) return;
    this.recordBeanInstanceProps[beanFullName] = [];
    for (const { beanInstance, prop } of recordBeanInstanceProps) {
      delete beanInstance[SymbolBeanInstancePropsLazy][prop];
    }
  }
}
