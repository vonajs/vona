import type { IDecoratorSsrMenuOptions } from 'vona-module-a-ssr';
import type { ISsrSiteOptionsAdmin } from 'vona-module-start-siteadmin';
import { BeanBase } from 'vona';
import { $order } from 'vona-module-a-openapiutils';
import { SsrMenu } from 'vona-module-a-ssr';

export interface ISsrMenuOptionsHome extends IDecoratorSsrMenuOptions<ISsrSiteOptionsAdmin> {}

@SsrMenu<ISsrMenuOptionsHome>({
  item: {
    title: '',
    order: $order(1),
    icon: undefined,
    link: undefined,
    group: undefined,
  },
  site: ['start-siteadmin:admin'],
})
export class SsrMenuHome extends BeanBase {}
