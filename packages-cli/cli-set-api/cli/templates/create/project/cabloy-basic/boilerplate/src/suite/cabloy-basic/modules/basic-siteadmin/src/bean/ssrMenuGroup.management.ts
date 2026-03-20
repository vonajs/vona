import type { IDecoratorSsrMenuGroupOptions } from 'vona-module-a-ssr';

import { BeanBase } from 'vona';
import { $order } from 'vona-module-a-openapiutils';
import { SsrMenuGroup } from 'vona-module-a-ssr';

import { $locale } from '../.metadata/locales.ts';

export interface ISsrMenuGroupOptionsManagement extends IDecoratorSsrMenuGroupOptions {}

@SsrMenuGroup<ISsrMenuGroupOptionsManagement>({
  item: {
    title: $locale('Management'),
    order: $order(2),
  },
  site: ['basic-siteadmin:admin'],
})
export class SsrMenuGroupManagement extends BeanBase {}
