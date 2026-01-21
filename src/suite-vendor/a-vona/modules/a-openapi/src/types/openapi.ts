import type { IOpenapiOptionsResourceMeta } from './resourceMeta.ts';

declare module 'vona-module-a-openapiutils' {
  export interface IOpenapiOptions {
    resourceMeta?: IOpenapiOptionsResourceMeta;
  }
}
