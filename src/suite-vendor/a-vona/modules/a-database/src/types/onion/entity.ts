import type { OmitNever } from 'vona';
import type { ServiceOnion } from 'vona-module-a-onion';
import type { TypeOpenAPIMetadata } from 'vona-module-a-openapi';

export interface IEntityRecord {}

export interface IDecoratorEntityOptions {
  table?: string;
  independent?: boolean;
  openapi?: TypeOpenAPIMetadata;
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
