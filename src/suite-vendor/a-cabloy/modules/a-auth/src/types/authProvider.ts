import type { OmitNever } from 'vona';
import type { IOnionOptionsEnable, ServiceOnion } from 'vona-module-a-onion';
import type { IAuthUserProfile } from './auth.ts';

export interface IAuthProviderRecord {}

export interface IAuthProviderClientRecord {
  default: never;
}

export interface IAuthProviderClientOptions {}

export interface IDecoratorAuthProviderOptions<
  K extends keyof IAuthProviderClientRecord = keyof IAuthProviderClientRecord,
  T extends IAuthProviderClientOptions = IAuthProviderClientOptions,
>
  extends IOnionOptionsEnable {
  default: T;
  clients: Record<K, T>;
}

export interface IAuthProviderExecute {
  execute(clientOptions: IAuthProviderClientOptions, options: IDecoratorAuthProviderOptions): Promise<IAuthUserProfile>;
}

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
