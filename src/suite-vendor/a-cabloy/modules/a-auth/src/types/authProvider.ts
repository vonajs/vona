import type { Next, OmitNever } from 'vona';
import type { IOnionOptionsEnable, ServiceOnion } from 'vona-module-a-onion';

export interface IAuthProviderRecord {}

export interface IMiddlewareExecute {
  execute(options: IDecoratorAuthProviderOptions, next: Next): Promise<any>;
}

export interface IDecoratorAuthProviderOptions extends IOnionOptionsEnable {}

declare module 'vona-module-a-onion' {
  export interface BeanOnion {
    authProvider: ServiceOnion<IDecoratorAuthProviderOptions, keyof IAuthProviderRecord>;
  }
}

declare module 'vona' {
  export interface ConfigOnions {
    authProvider: OmitNever<IAuthProviderRecord>;
  }

  export interface IBeanSceneRecord {
    authProvider: never;
  }
}
