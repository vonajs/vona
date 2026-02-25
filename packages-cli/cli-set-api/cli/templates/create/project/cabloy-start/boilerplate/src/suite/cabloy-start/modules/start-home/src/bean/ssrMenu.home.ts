import type { IDecoratorSsrMenuOptions } from 'vona-module-a-ssr';
import type { ISsrSiteOptionsHome } from './ssrSite.home.ts';
import { BeanBase } from 'vona';
import { $order } from 'vona-module-a-openapiutils';
import { SsrMenu } from 'vona-module-a-ssr';
import { $locale } from '../.metadata/locales.ts';

export interface ISsrMenuOptionsHome extends IDecoratorSsrMenuOptions<ISsrSiteOptionsHome> {}

@SsrMenu<ISsrMenuOptionsHome>({
  item: {
    title: $locale('Home'),
    icon: '::home',
    link: '/',
    order: $order(1, 'core'),
  },
  site: ['start-home:home'],
})
export class SsrMenuHome extends BeanBase {}
