import { Application as EggApplication, EggLoaderOptions } from 'egg';
import { BeanContainer } from '../../lib/module/bean/beanContainer.js';
import { AppMeta } from '../../lib/module/meta.js';
import 'egg-redis';

export interface CabloyApplication extends EggApplication {
  options: EggLoaderOptions;
  meta: AppMeta;
  bean: BeanContainer;
}
