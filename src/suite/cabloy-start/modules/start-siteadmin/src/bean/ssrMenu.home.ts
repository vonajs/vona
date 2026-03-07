import type { IDecoratorSsrMenuOptions } from 'vona-module-a-ssr';
import type { ISsrSiteOptionsAdmin } from 'vona-module-start-siteadmin';
import { BeanBase } from 'vona';
import { $order } from 'vona-module-a-openapiutils';
import { SsrMenu } from 'vona-module-a-ssr';
import { $locale } from '../.metadata/locales.ts';

export interface ISsrMenuOptionsHome extends IDecoratorSsrMenuOptions<ISsrSiteOptionsAdmin> {}

@SsrMenu<ISsrMenuOptionsHome>({
  item: {
    title: $locale('Home'),
    order: $order(1, 'core'),
    icon: '::home',
    link: '/',
  },
  site: ['start-siteadmin:admin'],
})
export class SsrMenuHome extends BeanBase {}
