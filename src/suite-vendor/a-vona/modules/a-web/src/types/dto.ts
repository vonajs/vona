import type { OmitNever } from 'vona';
import type { ServiceOnion } from 'vona-module-a-onion';
import type { TypeOpenAPIMetadata } from 'vona-module-a-openapi';

export interface IDtoRecord {}

export interface IDecoratorDtoOptions<FieldsMore = never> {
  independent?: boolean;
  openapi?: TypeOpenAPIMetadata;
  fieldsMore?: FieldsMore;
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
