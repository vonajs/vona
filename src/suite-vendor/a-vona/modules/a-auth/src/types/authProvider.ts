import type { Constructable, OmitNever } from 'vona';
import type { IOnionOptionsEnable, ServiceOnion } from 'vona-module-a-onion';
import type { IAuthUserProfile } from 'vona-module-a-user';

export interface IAuthProviderRecord {}

export interface IAuthProviderClientRecord {
  default: never;
}

export interface IAuthProviderClientOptions {
  confirmed?: boolean;
}

export interface IAuthProviderOauth2ClientOptions extends IAuthProviderClientOptions {
  clientID?: string;
  clientSecret?: string;
  scope?: string;
  authorizationURL?: string;
  tokenURL?: string;
  scopeSeparator?: string;
  customHeaders?: object;
}

export type TypeStrategyOptions<T extends IAuthProviderClientOptions = IAuthProviderClientOptions> = T & {
  callbackURL?: string;
  state?: string;
};

export type TypeStrategyVerifyArgs = any[];
export type TypeStrategyOauth2VerifyArgs<T = IAuthUserProfile> = [accessToken: string, refreshToken: string, profile: T];

export interface IDecoratorAuthProviderOptions<
  K extends keyof IAuthProviderClientRecord = keyof IAuthProviderClientRecord,
  T extends IAuthProviderClientOptions = IAuthProviderClientOptions,
>
  extends IOnionOptionsEnable {
  default?: T;
  clients?: { [prop in K]?: T }; // Record<K, T>;
}

export interface IAuthProviderStrategy {
  strategy(clientOptions: IAuthProviderClientOptions, options: IDecoratorAuthProviderOptions): Promise<Constructable>;
}

export interface IAuthProviderVerify {
  verify(args: TypeStrategyVerifyArgs, clientOptions: IAuthProviderClientOptions, options: IDecoratorAuthProviderOptions): Promise<IAuthUserProfile>;
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
