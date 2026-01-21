import type { TypeComponentRecordSelectorKeysStrict, TypeResourceActionRowRecord, TypeResourceActionTableRecord } from 'vona-module-a-openapi';
import type { IFormProvider } from './formProvider.ts';
import type { ITableProvider } from './tableProvider.ts';

export interface IOpenapiOptionsResourceMeta {
  permissions?: IOpenapiOptionsRestResourcePermissions;
  provider?: IOpenapiOptionsRestResourceProvider;
  form?: IOpenapiOptionsRestResourceForm;
  table?: IOpenapiOptionsRestResourceTable;
}

export interface IOpenapiOptionsRestResourceForm {
  provider?: IFormProvider;
}

export interface IOpenapiOptionsRestResourceTable {
  provider?: ITableProvider;
}

export interface IOpenapiOptionsRestResourcePermissions {
  table?: TypeOpenApiOptionsRestResourcePermissionsTable;
  row?: TypeOpenApiOptionsRestResourcePermissionsRow;
}

export type TypeOpenApiOptionsRestResourcePermissionsTable = {
  [key in keyof TypeResourceActionTableRecord]?: boolean;
};

export type TypeOpenApiOptionsRestResourcePermissionsRow = {
  [key in keyof TypeResourceActionRowRecord]?: boolean;
};

export interface IOpenapiOptionsRestResourceProvider {
  components?: IOpenapiOptionsRestResourceProviderComponents;
}

export interface IOpenapiOptionsRestResourceProviderComponents {
  restPage?: TypeComponentRecordSelectorKeysStrict<'restPage'>;
  table?: TypeComponentRecordSelectorKeysStrict<'table'>;
  form?: TypeComponentRecordSelectorKeysStrict<'form'>;
}
