import type { TypeComponentRecordSelectorKeysStrict } from './component.ts';
import type { IFormProvider } from './formProvider.ts';

export interface IOpenApiOptionsRestResource {
  permissions?: IOpenApiOptionsRestResourcePermissions;
  provider?: IOpenApiOptionsRestResourceProvider;
  form?: IOpenApiOptionsRestResourceForm;
}

export interface IOpenApiOptionsRestResourceForm {
  provider?: IFormProvider;
}

export interface IOpenApiOptionsRestResourcePermissions {
  create?: boolean;
  update?: boolean;
  delete?: boolean;
}

export interface IOpenApiOptionsRestResourceProvider {
  components?: IOpenApiOptionsRestResourceProviderComponents;
}

export interface IOpenApiOptionsRestResourceProviderComponents {
  restPage?: TypeComponentRecordSelectorKeysStrict<'restPage'>;
  table?: TypeComponentRecordSelectorKeysStrict<'table'>;
  form?: TypeComponentRecordSelectorKeysStrict<'form'>;
}
