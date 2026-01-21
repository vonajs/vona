import type { IOpenApiOptionsResourceMeta } from './resourceMeta.ts';

declare module 'vona-module-a-openapiutils' {
  export interface IOpenApiOptions {
    resourceMeta?: IOpenApiOptionsResourceMeta;
  }
}
