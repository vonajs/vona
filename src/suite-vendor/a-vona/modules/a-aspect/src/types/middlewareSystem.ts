import { Next, OmitNever } from 'vona';
import { IOnionOptionsBase, IOnionOptionsDeps, ServiceOnion } from 'vona-module-a-onion';
import { IApiPathRecord } from 'vona-module-a-web';

export interface IMiddlewareSystemRecord {}

export interface IMiddlewareSystemExecute {
  execute(options: IDecoratorMiddlewareSystemOptions, next: Next): Promise<any>;
}

export interface IDecoratorMiddlewareSystemOptions
  extends IOnionOptionsBase<keyof IApiPathRecord>,
    IOnionOptionsDeps<keyof IMiddlewareSystemRecord> {}

declare module 'vona-module-a-onion' {
  export interface BeanOnion {
    middlewareSystem: ServiceOnion<IDecoratorMiddlewareSystemOptions, keyof IMiddlewareSystemRecord>;
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
