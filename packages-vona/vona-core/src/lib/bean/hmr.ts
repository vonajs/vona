import type { BeanContainer } from 'vona';

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

export class Hmr {
  private beanContainer: BeanContainer;
  private recordBeanInstances: Record<string, IRecordBeanInstance[]> = {};
  private recordBeanInstanceProps: Record<string, IRecordBeanInstanceProp[]> = {};

  constructor(beanContainer: BeanContainer) {
    this.beanContainer = beanContainer;
  }

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
}
