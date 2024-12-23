import { IBeanRecordGeneral } from 'vona';
import { ServiceOnion } from 'vona-module-a-onion';

export type IBeanRecordGeneralDatabaseDialect = {
  [K in keyof IBeanRecordGeneral as K extends `${string}.databaseDialect.${string}` ? K : never]: IBeanRecordGeneral[K];
};

export interface IDatabaseDialectRecord {}

export interface IDecoratorDatabaseDialectOptions {}

declare module 'vona-module-a-onion' {
  export interface BeanOnion {
    databaseDialect: ServiceOnion<IDecoratorDatabaseDialectOptions, keyof IDatabaseDialectRecord>;
  }
}

declare module 'vona' {
  export interface ConfigOnions {
    // databaseDialect: OmitNever<IDatabaseDialectRecord>;
  }

  export interface IBeanSceneRecord {
    databaseDialect: never;
  }
}
