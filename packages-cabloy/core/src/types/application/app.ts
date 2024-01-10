import { Application as EggApplication } from 'egg';
import { BeanContainer } from '../../lib/module/bean/beanContainer.js';
import { AppMeta } from '../../lib/module/meta.js';

export interface CabloyApplication extends EggApplication {
  meta: AppMeta;
  bean: BeanContainer;
}
