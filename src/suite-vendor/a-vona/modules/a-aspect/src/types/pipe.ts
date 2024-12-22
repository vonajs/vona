import { Constructable, OmitNever, Type, VonaContext } from 'vona';
import { IOnionOptionsBase, IOnionOptionsDeps, IOnionSlice, ServiceOnion } from 'vona-module-a-onion';
import { IApiPathRecord } from 'vona-module-a-web';
import { z } from 'zod';

export interface IPipeRecordGlobal {}
export interface IPipeRecordLocal {}
export type IPipeRecord = IPipeRecordGlobal & IPipeRecordLocal;

export interface IPipeTransform<T = any, R = any> {
  transform(value: T, metadata: RouteHandlerArgumentMeta, options: IDecoratorPipeOptions): Promise<R>;
}

export interface IDecoratorPipeOptions {
  enable?: boolean;
}

export interface IDecoratorPipeOptionsGlobal
  extends IOnionOptionsBase<keyof IApiPathRecord>,
    IOnionOptionsDeps<keyof IPipeRecordGlobal> {
  global: true;
}

declare module 'vona-module-a-onion' {
  export interface BeanOnion {
    pipe: ServiceOnion<IDecoratorPipeOptionsGlobal, keyof IPipeRecord>;
  }
}

declare module 'vona' {
  export interface ConfigOnions {
    pipe: OmitNever<IPipeRecord>;
  }

  export interface IBeanSceneRecord {
    pipe: never;
  }
}
