import type { IDecoratorSsrSiteOptions } from 'vona-module-a-ssr';
import type { IPagePathRecord } from 'zova-rest-cabloy-start-web';
import { BeanSsrSiteBase, SsrSite } from 'vona-module-a-ssr';

declare module 'vona-module-a-ssr' {
  export interface ISsrSitePublicPathRecord {
    '': never;
  }
}

export interface ISsrSiteOptionsWebPages extends IPagePathRecord {}

export interface ISsrSiteOptionsWebPagesData {}

export interface ISsrSiteOptionsWeb extends IDecoratorSsrSiteOptions<ISsrSiteOptionsWebPages, ISsrSiteOptionsWebPagesData> {}

@SsrSite<ISsrSiteOptionsWeb>({
  publicPath: '',
  assetPath: 'ssr-cabloyStartWeb-5.0.0',
})
export class SsrSiteWeb extends BeanSsrSiteBase<ISsrSiteOptionsWeb> {}
