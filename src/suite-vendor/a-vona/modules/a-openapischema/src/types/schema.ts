import type { IOpenAPIObject } from 'vona-module-a-openapi';

export interface IOpenapiSchema {
  doc: IOpenAPIObject['V31'];
  meta?: IOpenapiSchemaMeta;
}

export interface IOpenapiSchemaMeta {}
