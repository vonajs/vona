import type { IDecoratorSsrSiteOptions } from 'vona-module-a-ssr';
import type { IPagePathRecord } from 'zova-rest-cabloy-start-front';
import { BeanSsrSiteBase, SsrSite } from 'vona-module-a-ssr';

declare module 'vona-module-a-ssr' {
  export interface ISsrSitePublicPathRecord {
    '': never;
  }
}

export interface ISsrSiteOptionsFrontPages extends IPagePathRecord {}

export interface ISsrSiteOptionsFrontPagesData {}

export interface ISsrSiteOptionsFront extends IDecoratorSsrSiteOptions<ISsrSiteOptionsFrontPages, ISsrSiteOptionsFrontPagesData> {}

@SsrSite<ISsrSiteOptionsFront>({
  publicPath: '',
  assetPath: 'ssr-cabloyStartFront-5.0.0',
})
export class SsrSiteFront extends BeanSsrSiteBase<ISsrSiteOptionsFront> {}
