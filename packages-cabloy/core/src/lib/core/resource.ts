import { IDecoratorBeanOptionsBase } from '../decorator/index.js';
import { BeanBase } from '../module/bean/beanBase.js';

export class AppResource extends BeanBase {
  beans: Record<string, IDecoratorBeanOptionsBase> = {};
}

export const appResource = new AppResource();
