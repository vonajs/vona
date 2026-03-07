import type { IDecoratorSsrSiteOptions } from 'vona-module-a-ssr';
import { BeanSsrSiteBase, SsrSite } from 'vona-module-a-ssr';

declare module 'vona-module-a-ssr' {
  export interface ISsrSitePublicPathRecord {
    some: never;
  }
}

export interface ISsrSiteOptionsAdminPages {}

export interface ISsrSiteOptionsAdminPagesData {}

export interface ISsrSiteOptionsAdmin extends IDecoratorSsrSiteOptions<ISsrSiteOptionsAdminPages, ISsrSiteOptionsAdminPagesData> {}

@SsrSite<ISsrSiteOptionsAdmin>({
  publicPath: 'some',
  assetPath: 'front-bundle-path',
})
export class SsrSiteAdmin extends BeanSsrSiteBase<ISsrSiteOptionsAdmin> {}
