import type { Next, NextSync, OmitNever } from 'vona';
import type { IOnionOptionsEnable, ServiceOnion } from 'vona-module-a-onion';

export const SymbolDecoratorUseAopMethod = Symbol('SymbolDecoratorUseAopMethod');
export interface IUseAopMethodPropMetadata<T extends keyof IAopMethodRecord = any> {
  beanInstance?: any;
  onionName?: T;
  options?: Partial<IAopMethodRecord[T]>;
}

export interface IAopMethodRecord {}

export interface IAopMethodGet {
  get(options: IDecoratorAopMethodOptions, next: NextSync, receiver: any, prop: string): any;
}

export interface IAopMethodSet {
  set(options: IDecoratorAopMethodOptions, value: any, next: NextSync, receiver: any, prop: string): void;
}

export interface IAopMethodExecute {
  execute(options: IDecoratorAopMethodOptions, args: [], next: Next | NextSync, receiver: any, prop: string): Promise<any> | any;
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
