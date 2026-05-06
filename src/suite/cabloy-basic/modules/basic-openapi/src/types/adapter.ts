import type {
  IResourceComponentActionBulkRecord as IResourceComponentActionBulkRecordProvider,
  IResourceComponentActionRowRecord as IResourceComponentActionRowRecordProvider,
  IResourceComponentBlockRecord as IResourceComponentBlockRecordProvider,
  IResourceComponentFormFieldRecord as IResourceComponentFormFieldRecordProvider,
  IResourceComponentTableCellRecord as IResourceComponentTableCellRecordProvider,
  ISchemaRenderComponentLayoutOptions as ISchemaRenderComponentLayoutOptionsProvider,
} from 'zova-rest-cabloy-basic-admin';

import 'vona-module-a-openapi';

declare module 'vona-module-a-openapi' {
  export interface IResourceComponentActionBulkRecord extends IResourceComponentActionBulkRecordProvider {}

  export interface IResourceComponentActionRowRecord extends IResourceComponentActionRowRecordProvider {}

  export interface IResourceComponentBlockRecord extends IResourceComponentBlockRecordProvider {}

  export interface IResourceComponentFormFieldRecord extends IResourceComponentFormFieldRecordProvider {}

  export interface IResourceComponentTableCellRecord extends IResourceComponentTableCellRecordProvider {}

  export interface ISchemaRenderComponentLayoutOptions extends ISchemaRenderComponentLayoutOptionsProvider {}
}
