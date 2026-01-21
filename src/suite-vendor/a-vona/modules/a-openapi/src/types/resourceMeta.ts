import type { TypeComponentRecordSelectorKeysStrict, TypeResourceActionRowRecord, TypeResourceActionTableRecord } from 'vona-module-a-openapi';
import type { IFormProvider } from './formProvider.ts';
import type { ITableProvider } from './tableProvider.ts';

export interface IOpenApiOptionsResourceMeta {
  permissions?: IOpenApiOptionsRestResourcePermissions;
  provider?: IOpenApiOptionsRestResourceProvider;
  form?: IOpenApiOptionsRestResourceForm;
  table?: IOpenApiOptionsRestResourceTable;
}

export interface IOpenApiOptionsRestResourceForm {
  provider?: IFormProvider;
}

export interface IOpenApiOptionsRestResourceTable {
  provider?: ITableProvider;
}

export interface IOpenApiOptionsRestResourcePermissions {
  table?: TypeOpenApiOptionsRestResourcePermissionsTable;
  row?: TypeOpenApiOptionsRestResourcePermissionsRow;
}

export type TypeOpenApiOptionsRestResourcePermissionsTable = {
  [key in keyof TypeResourceActionTableRecord]?: boolean;
};

export type TypeOpenApiOptionsRestResourcePermissionsRow = {
  [key in keyof TypeResourceActionRowRecord]?: boolean;
};

export interface IOpenApiOptionsRestResourceProvider {
  components?: IOpenApiOptionsRestResourceProviderComponents;
}

export interface IOpenApiOptionsRestResourceProviderComponents {
  restPage?: TypeComponentRecordSelectorKeysStrict<'restPage'>;
  table?: TypeComponentRecordSelectorKeysStrict<'table'>;
  form?: TypeComponentRecordSelectorKeysStrict<'form'>;
}
