import type { Next, NextSync, OmitNever } from 'vona';
import type { IOnionOptionsEnable, ServiceOnion } from 'vona-module-a-onion';

export interface IAopMethodRecord {}

export interface IAopMethodGet {
  get(options: IDecoratorAopMethodOptions, next: Next): any;
}

export interface IAopMethodSet {
  set(options: IDecoratorAopMethodOptions, value: any, next: Next): void;
}

export interface IAopMethodExecute {
  execute(options: IDecoratorAopMethodOptions, args: [], next: Next | NextSync): Promise<any> | any;
}

export interface IDecoratorAopMethodOptions extends IOnionOptionsEnable {}

declare module 'vona-module-a-onion' {
  export interface BeanOnion {
    aopMethod: ServiceOnion<IDecoratorAopMethodOptions, keyof IAopMethodRecord>;
  }
}

declare module 'vona' {
  export interface ConfigOnions {
    aopMethod: OmitNever<IAopMethodRecord>;
  }

  export interface IBeanSceneRecord {
    aopMethod: never;
  }
}
