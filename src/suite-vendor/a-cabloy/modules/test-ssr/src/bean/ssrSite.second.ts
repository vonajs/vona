import type { IDecoratorSsrSiteOptions } from 'vona-module-a-ssr';
import type { IPagePathRecord } from 'zova-rest-cabloy-basic-admin';
import type { DtoTestResult } from '../dto/testResult.tsx';
import { BeanSsrSiteBase, SsrSite } from 'vona-module-a-ssr';

declare module 'vona-module-a-ssr' {
  export interface ISsrSitePublicPathRecord {
    second: never;
  }
}

export interface ISsrSiteOptionsSecondPages extends IPagePathRecord {}

export interface ISsrSiteOptionsSecondPagesData {
  '/demo/basic/toolOne/:id?': unknown;
  '/demo/basic/toolTwo/:id?': DtoTestResult;
}

export interface ISsrSiteOptionsSecond extends IDecoratorSsrSiteOptions<ISsrSiteOptionsSecondPages, ISsrSiteOptionsSecondPagesData> {}

@SsrSite<ISsrSiteOptionsSecond>({
  publicPath: 'second',
  assetPath: 'ssr-cabloyBaseAdmin-5.0.17',
})
export class SsrSiteSecond extends BeanSsrSiteBase<ISsrSiteOptionsSecond> {}
