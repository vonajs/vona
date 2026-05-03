import type { OmitNever } from 'vona';
import type { ServiceOnion } from 'vona-module-a-onion';
import type {
  IResourceActionBulkOptionsOperationsBulkAction,
  IResourceActionRowOptionsOperationsRowAction,
  IResourceComponentBlockOptionsBlock,
  TypeOpenapiMetadata,
} from 'vona-module-a-openapi';
import type { SchemaLike } from 'vona-module-a-openapiutils';
import type { SymbolKeyFieldsMore } from 'vona-module-a-orm';

export interface IDtoRecord {}

export interface IDecoratorDtoOptions<FieldsMore = never> {
  [SymbolKeyFieldsMore]?: FieldsMore;
  independent?: boolean;
  openapi?: TypeOpenapiMetadata;
  pipes?: SchemaLike | SchemaLike[];
  actions?:
    | IResourceActionBulkOptionsOperationsBulkAction[]
    | IResourceActionRowOptionsOperationsRowAction[];
  blocks?: IResourceComponentBlockOptionsBlock[];
}

declare module 'vona-module-a-onion' {
  export interface BeanOnion {
    dto: ServiceOnion<IDtoRecord>;
  }
}

declare module 'vona' {
  export interface ConfigOnions {
    dto: OmitNever<IDtoRecord>;
  }

  export interface IBeanSceneRecord {
    dto: never;
  }
}
