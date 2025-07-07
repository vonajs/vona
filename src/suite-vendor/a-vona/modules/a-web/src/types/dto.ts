import type { OmitNever } from 'vona';
import type { SymbolKeyFieldsMore } from 'vona-module-a-database';
import type { ServiceOnion } from 'vona-module-a-onion';
import type { TypeOpenapiMetadata } from 'vona-module-a-openapi';

export interface IDtoRecord {}

export interface IDecoratorDtoOptions<FieldsMore = never> {
  [SymbolKeyFieldsMore]?: FieldsMore;
  independent?: boolean;
  openapi?: TypeOpenapiMetadata;
}

declare module 'vona-module-a-onion' {
  export interface BeanOnion {
    dto: ServiceOnion<IDecoratorDtoOptions, keyof IDtoRecord>;
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
