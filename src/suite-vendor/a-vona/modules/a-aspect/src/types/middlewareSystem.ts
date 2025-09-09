import type { Next, OmitNever } from 'vona';
import type { IOnionOptionsBase, IOnionOptionsDeps, ServiceOnion } from 'vona-module-a-onion';

export interface IMiddlewareSystemRecord {}

export interface IMiddlewareSystemExecute {
  execute(options: IDecoratorMiddlewareSystemOptions, next: Next): Promise<any>;
}

export interface IDecoratorMiddlewareSystemOptions
  // not use IApiPathRecord, because has no matched route
  extends IOnionOptionsBase<string>,
  IOnionOptionsDeps<keyof IMiddlewareSystemRecord> {}

declare module 'vona-module-a-onion' {
  export interface BeanOnion {
    middlewareSystem: ServiceOnion<IMiddlewareSystemRecord>;
  }
}

declare module 'vona' {
  export interface ConfigOnions {
    middlewareSystem: OmitNever<IMiddlewareSystemRecord>;
  }

  export interface IBeanSceneRecord {
    middlewareSystem: never;
  }
}
