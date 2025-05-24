import type { TypeComponentRecordSelectorKeysStrict } from './component.ts';

export interface IOpenApiOptionsRest {
  permissions: IOpenApiOptionsRestPermissions;
  provider: IOpenApiOptionsRestProvider;
}

export interface IOpenApiOptionsRestPermissions {
  create?: boolean;
  update?: boolean;
  delete?: boolean;
}

export interface IOpenApiOptionsRestProvider {
  components: IOpenApiOptionsRestProviderComponents;
}

export interface IOpenApiOptionsRestProviderComponents {
  restPage: TypeComponentRecordSelectorKeysStrict<'restPage'>;
  table: TypeComponentRecordSelectorKeysStrict<'table'>;
  form: TypeComponentRecordSelectorKeysStrict<'form'>;
}
