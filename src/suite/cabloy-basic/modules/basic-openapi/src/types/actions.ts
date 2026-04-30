import 'vona-module-a-openapi';
import type {
  IResourceActionRowOptionsBase,
  IResourceActionRowRecord,
  IResourceActionBulkOptionsBase,
  IResourceActionBulkRecord,
  ISchemaObjectExtensionFieldRestScene,
} from 'vona-module-a-openapi';

declare module 'vona-module-a-openapi' {
  /** table */
  export interface IResourceActionBulkRecord {
    create?: IResourceActionBulkOptionsCreate;
    operationsBulk?: IResourceActionBulkOptionsOperationsBulk;
  }

  /** row */
  export interface IResourceActionRowRecord {
    view?: IResourceActionRowOptionsView;
    update?: IResourceActionRowOptionsUpdate;
    delete?: IResourceActionRowOptionsDelete;
    operationsRow?: IResourceActionRowOptionsOperationsRow;
  }
}

export interface IResourceActionBulkOptionsCreate extends IResourceActionBulkOptionsBase {}
export interface IResourceActionBulkOptionsOperationsBulk extends IResourceActionBulkOptionsBase {}

export interface IResourceActionRowOptionsView extends IResourceActionRowOptionsBase {}

export interface IResourceActionRowOptionsUpdate extends IResourceActionRowOptionsBase {}

export interface IResourceActionRowOptionsDelete extends IResourceActionRowOptionsBase {}

export interface IResourceActionRowOptionsOperationsRow extends IResourceActionRowOptionsBase {
  actions?: IResourceActionRowOptionsOperationsRowAction[];
}

export interface IResourceActionBulkOptionsOperationsBulk extends IResourceActionBulkOptionsBase {
  actions?: IResourceActionBulkOptionsOperationsBulkAction[];
}

export interface IResourceActionRowOptionsOperationsRowAction {
  name: keyof Omit<IResourceActionRowRecord, 'operationsRow'>;
  options: ISchemaObjectExtensionFieldRestScene;
}

export interface IResourceActionBulkOptionsOperationsBulkAction {
  name: keyof Omit<IResourceActionBulkRecord, 'operationsBulk'>;
  options: ISchemaObjectExtensionFieldRestScene;
}
