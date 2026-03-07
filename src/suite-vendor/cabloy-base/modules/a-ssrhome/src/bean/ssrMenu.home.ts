import type { IDecoratorSsrMenuOptions } from 'vona-module-a-ssr';
import type { ISsrSiteOptionsHome } from './ssrSite.home.ts';
import { BeanBase } from 'vona';
import { SsrMenu } from 'vona-module-a-ssr';
import { $locale } from '../.metadata/locales.ts';

export interface ISsrMenuOptionsHome extends IDecoratorSsrMenuOptions<ISsrSiteOptionsHome> {}

@SsrMenu<ISsrMenuOptionsHome>({
  item: {
    title: $locale('Home'),
    icon: '::home',
    link: '/',
  },
  site: ['a-ssrhome:home'],
})
export class SsrMenuHome extends BeanBase {}
