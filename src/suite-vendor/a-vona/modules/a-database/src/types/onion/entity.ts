import type { OmitNever } from 'vona';
import type { ServiceOnion } from 'vona-module-a-onion';
import type { TypeOpenapiMetadata } from 'vona-module-a-openapi';
import type { SymbolKeyFieldsMore } from '../entity.ts';
import type { ITableRecord } from './table.ts';

export interface IEntityRecord {}

export interface IDecoratorEntityOptions<FieldsMore = never> {
  [SymbolKeyFieldsMore]?: FieldsMore;
  table?: keyof ITableRecord;
  independent?: boolean;
  openapi?: TypeOpenapiMetadata;
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
