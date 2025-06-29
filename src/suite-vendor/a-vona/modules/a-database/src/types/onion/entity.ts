import type { OmitNever } from 'vona';
import type { ServiceOnion } from 'vona-module-a-onion';
import type { TypeOpenAPIMetadata } from 'vona-module-a-openapi';
import type { ITableRecord } from './table.ts';

export interface IEntityRecord {}

export interface IDecoratorEntityOptions<FieldsMore = never> {
  table?: keyof ITableRecord;
  independent?: boolean;
  openapi?: TypeOpenAPIMetadata;
  _fieldsMore_?: FieldsMore;
}

declare module 'vona-module-a-onion' {
  export interface BeanOnion {
    entity: ServiceOnion<IDecoratorEntityOptions, keyof IEntityRecord>;
  }
}

declare module 'vona' {
  export interface ConfigOnions {
    entity: OmitNever<IEntityRecord>;
  }

  export interface IBeanSceneRecord {
    entity: never;
  }
}
