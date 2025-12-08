import type { IDecoratorBeanOptionsBase } from 'vona';
import { appResource, SymbolBeanContainerInstances, SymbolBeanInstancePropsLazy } from 'vona';
import { BeanSimple } from '../bean/beanSimple.ts';
import { pathToHref } from '../utils/util.ts';

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
  private recordBeanInstances: Record<string, IRecordBeanInstance[]> = {};
  private recordBeanInstanceProps: Record<string, IRecordBeanInstanceProp[]> = {};

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

  async reloadBean(file: string) {
    const fileUrl = `${pathToHref(file)}?${Date.now()}`;
    const fileModule = await import(fileUrl);
    for (const key in fileModule) {
      const item = fileModule[key];
      if (typeof item !== 'function') continue;
      const beanOptions = appResource.getBean(item);
      if (!beanOptions) continue;
      await this._reloadBeanInstances(beanOptions);
      this._reloadBeanInstanceProps(beanOptions);
    }
  }

  private async _reloadBeanInstances(beanOptions: IDecoratorBeanOptionsBase) {
    const { scene, beanFullName } = beanOptions;
    const beanContainer = this.app.bean;
    const recordBeanInstances = this.recordBeanInstances[beanFullName];
    if (!recordBeanInstances) return;
    const recordBeanInstancesClone = recordBeanInstances.concat([]);
    this.recordBeanInstances[beanFullName] = [];
    for (const { beanInstanceKey, withSelector, args } of recordBeanInstancesClone) {
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
    const recordBeanInstancePropsClone = recordBeanInstanceProps.concat([]);
    this.recordBeanInstanceProps[beanFullName] = [];
    for (const { beanInstance, prop } of recordBeanInstancePropsClone) {
      delete beanInstance[SymbolBeanInstancePropsLazy][prop];
    }
  }
}
