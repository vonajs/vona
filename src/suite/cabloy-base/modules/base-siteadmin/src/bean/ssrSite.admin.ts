import type { IDecoratorSsrSiteOptions } from 'vona-module-a-ssr';
import type { IPagePathRecord } from 'zova-rest-cabloy-base-admin';
import { BeanSsrSiteBase, SsrSite } from 'vona-module-a-ssr';

declare module 'vona-module-a-ssr' {
  export interface ISsrSitePublicPathRecord {
    '': never;
  }
}

export interface ISsrSiteOptionsAdminPages extends IPagePathRecord {}

export interface ISsrSiteOptionsAdminPagesData {}

export interface ISsrSiteOptionsAdmin extends IDecoratorSsrSiteOptions<ISsrSiteOptionsAdminPages, ISsrSiteOptionsAdminPagesData> {}

@SsrSite<ISsrSiteOptionsAdmin>({
  publicPath: '',
  assetPath: 'ssr-cabloyBaseAdmin-5.0.17',
})
export class SsrSiteAdmin extends BeanSsrSiteBase<ISsrSiteOptionsAdmin> {}
