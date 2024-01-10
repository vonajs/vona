import { Application as EggApplication } from 'egg';
import { AppMeta } from './meta.js';
import { BeanContainer } from '../../lib/module/bean/beanContainer.js';

export interface CabloyApplication extends EggApplication {
  meta: AppMeta;
  bean: BeanContainer;
}
