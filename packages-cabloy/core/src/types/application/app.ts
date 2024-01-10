import { Application as EggApplication, EggLoaderOptions } from 'egg';
import { BeanContainer } from '../../lib/module/bean/beanContainer.js';
import { AppMeta } from '../../lib/module/meta.js';

export interface CabloyApplication extends EggApplication {
  options: EggLoaderOptions;
  meta: AppMeta;
  bean: BeanContainer;
}
