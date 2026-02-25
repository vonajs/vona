import type { IDecoratorSsrMenuOptions } from 'vona-module-a-ssr';
import type { ISsrSiteOptionsHome } from 'vona-module-a-ssrhome';
import { BeanBase } from 'vona';
import { SsrMenu } from 'vona-module-a-ssr';
import { $locale } from '../.metadata/locales.ts';

export interface ISsrMenuOptionsProduct extends IDecoratorSsrMenuOptions<ISsrSiteOptionsHome> {}

@SsrMenu<ISsrMenuOptionsProduct>({
  items: {
    product: {
      title: $locale('Product'),
      group: 'start-home:management',
      link: 'presetResource',
      meta: {
        params: {
          resource: 'start-test:product',
        },
      },
    },
  },
  site: 'start-home:home',
})
export class SsrMenuProduct extends BeanBase {}
