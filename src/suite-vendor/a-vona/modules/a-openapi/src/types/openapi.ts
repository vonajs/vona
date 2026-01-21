import type { IOpenapiSchema } from 'vona-module-a-openapischema';
import type { IOpenApiOptionsResourceMeta } from './resourceMeta.ts';

export interface IOpenapiSchemaBootstrap extends IOpenapiSchema {
  api?: string;
}

declare module 'vona-module-a-openapiutils' {
  export interface IOpenApiOptions {
    resourceMeta?: IOpenApiOptionsResourceMeta;
  }
}
