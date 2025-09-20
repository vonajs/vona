import type { ISerializerTransformRecord } from './serializerTransform.ts';

export type TypeSchemaObjectExtensionFieldSerializerTransforms = {
  [K in keyof ISerializerTransformRecord]?: Partial<ISerializerTransformRecord[K]>;
};

declare module 'vona-module-a-openapi' {
  export interface ISchemaObjectExtensionField {
    exclude?: boolean;
    serializerTransforms?: TypeSchemaObjectExtensionFieldSerializerTransforms;
  }
}
