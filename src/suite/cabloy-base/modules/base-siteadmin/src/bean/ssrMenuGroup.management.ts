import type { IDecoratorSsrMenuGroupOptions } from 'vona-module-a-ssr';
import { BeanBase } from 'vona';
import { SsrMenuGroup } from 'vona-module-a-ssr';
import { $locale } from '../.metadata/locales.ts';

export interface ISsrMenuGroupOptionsManagement extends IDecoratorSsrMenuGroupOptions {}

@SsrMenuGroup<ISsrMenuGroupOptionsManagement>({
  item: {
    title: $locale('Management'),
  },
  site: ['base-siteadmin:admin'],
})
export class SsrMenuGroupManagement extends BeanBase {}
