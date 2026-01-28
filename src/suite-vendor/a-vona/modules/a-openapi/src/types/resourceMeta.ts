import type { IOpenapiPermissions, TypeComponentRecordSelectorKeysStrict, TypeRenderComponentJsx } from 'vona-module-a-openapi';
import type { IFormProvider } from './formProvider.ts';
import type { ITableProvider } from './tableProvider.ts';

export interface IOpenapiOptionsResourceMeta {
  /**
   * false: disallow
   * true: public
   * undefined: by api
   * IOpenapiPermissions: specific
   */
  permissions?: IOpenapiPermissions | boolean;
  provider?: IOpenapiOptionsResourceMetaProvider;
  form?: IOpenapiOptionsResourceMetaForm;
  table?: IOpenapiOptionsResourceMetaTable;
}

export interface IOpenapiOptionsResourceMetaForm {
  provider?: IFormProvider;
}

export interface IOpenapiOptionsResourceMetaTable {
  provider?: ITableProvider;
}

// export interface IOpenapiOptionsResourceMetaPermissions {
//   table?: TypeOpenApiOptionsRestResourcePermissionsTable;
//   row?: TypeOpenApiOptionsRestResourcePermissionsRow;
// }

// export type TypeOpenApiOptionsRestResourcePermissionsTable = {
//   [key in keyof TypeResourceActionTableRecord]?: boolean;
// };

// export type TypeOpenApiOptionsRestResourcePermissionsRow = {
//   [key in keyof TypeResourceActionRowRecord]?: boolean;
// };

export interface IOpenapiOptionsResourceMetaProvider {
  components?: IOpenapiOptionsResourceMetaProviderComponents;
}

export interface IOpenapiOptionsResourceMetaProviderComponents {
  restPage?: TypeComponentRecordSelectorKeysStrict<'restPage'> | TypeRenderComponentJsx;
  restPageEntry?: TypeComponentRecordSelectorKeysStrict<'restPageEntry'> | TypeRenderComponentJsx;
  table?: TypeComponentRecordSelectorKeysStrict<'table'>;
  form?: TypeComponentRecordSelectorKeysStrict<'form'>;
}
