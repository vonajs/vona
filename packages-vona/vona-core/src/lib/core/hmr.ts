import { toUpperCaseFirstChar } from '@cabloy/word-utils';
import { appResource, SymbolBeanContainerInstances } from 'vona';
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
  useOptions: any;
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

  addBeanInstanceProp(beanInstance: any, prop: string, targetBeanFullName: string, useOptions: any) {
    if (!this.recordBeanInstanceProps[targetBeanFullName]) {
      this.recordBeanInstanceProps[targetBeanFullName] = [];
    }
    this.recordBeanInstanceProps[targetBeanFullName].push({
      beanInstance,
      prop,
      useOptions,
    });
  }

  async reloadBean(sceneName: string, file: string) {
    const fileUrl = `${pathToHref(file)}?${Date.now()}`;
    const fileModule = await import(fileUrl);
    const sceneNameCapitalize = toUpperCaseFirstChar(sceneName);
    const beanClassName = Object.keys(fileModule).find(item => item.startsWith(sceneNameCapitalize));
    if (!beanClassName) return;
    const beanClass = fileModule[beanClassName];
    const beanOptions = appResource.getBean(beanClass)!;
    const beanFullName = beanOptions.beanFullName;
    await this._reloadBeanInstances(beanFullName);
  }

  private async _reloadBeanInstances(beanFullName: string) {
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
    }
  }
}
