import type { IDecoratorSsrMenuGroupOptions } from 'vona-module-a-ssr';
import { BeanBase } from 'vona';
import { SsrMenuGroup } from 'vona-module-a-ssr';
import { $locale } from '../.metadata/locales.ts';

export interface ISsrMenuGroupOptionsManagement extends IDecoratorSsrMenuGroupOptions {}

@SsrMenuGroup<ISsrMenuGroupOptionsManagement>({
  item: {
    title: $locale('Management'),
  },
  site: ['a-ssrhome:home'],
})
export class SsrMenuGroupManagement extends BeanBase {}
