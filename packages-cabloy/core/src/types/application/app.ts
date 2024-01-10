import { Application as EggApplication } from 'egg';
import { AppMeta } from './meta.js';

export interface CabloyApplication extends EggApplication {
  meta: AppMeta;
}
