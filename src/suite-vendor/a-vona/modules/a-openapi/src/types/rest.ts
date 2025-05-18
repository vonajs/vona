import 'openapi3-ts/oas30';
import 'openapi3-ts/oas31';

export interface ISchemaObjectExtensionFieldRest {
  render?: string;
}

export interface ISchemaObjectExtensionField {
  rest?: ISchemaObjectExtensionFieldRest;
}

declare module 'openapi3-ts/oas30' {
  export interface SchemaObject extends ISchemaObjectExtensionField {}
}

declare module 'openapi3-ts/oas31' {
  export interface SchemaObject extends ISchemaObjectExtensionField {}
}
