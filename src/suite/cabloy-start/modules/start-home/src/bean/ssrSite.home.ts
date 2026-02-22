import type { IDecoratorSsrSiteOptions } from 'vona-module-a-ssr';
import type { IPagePathRecord } from 'zova-rest-vona-home';
import { BeanSsrSiteBase, SsrSite } from 'vona-module-a-ssr';

declare module 'vona-module-a-ssr' {
  export interface ISsrSitePublicPathRecord {
    '': never;
  }
}

export interface ISsrSiteOptionsHomePages extends IPagePathRecord {}

export interface ISsrSiteOptionsHomePagesData {}

export interface ISsrSiteOptionsHome extends IDecoratorSsrSiteOptions<ISsrSiteOptionsHomePages, ISsrSiteOptionsHomePagesData> {}

@SsrSite<ISsrSiteOptionsHome>({
  publicPath: '',
  assetPath: 'ssr-vonaHome-1.0.0',
})
export class SsrSiteHome extends BeanSsrSiteBase<ISsrSiteOptionsHome> {}
