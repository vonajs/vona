import type { OmitNever, PowerPartial, VonaContext } from 'vona';
import type { ServiceOnion, TypeUseOnionOmitOptionsEnable } from 'vona-module-a-onion';
import type { ICaptchaProviderRecord } from './captchaProvider.ts';

export interface ICaptchaSceneRecord {}

export type ICaptchaSceneOptionsProviders = {
  [K in keyof ICaptchaProviderRecord]?: PowerPartial<TypeUseOnionOmitOptionsEnable<ICaptchaProviderRecord[K]>> | boolean;
};

export type ICaptchaSceneOptionsProvidersStrict = {
  [K in keyof ICaptchaProviderRecord]?: PowerPartial<TypeUseOnionOmitOptionsEnable<ICaptchaProviderRecord[K]>> ;
};

export type TypeCaptchaSceneOptionsResolver =
  (ctx: VonaContext, providers: (keyof ICaptchaProviderRecord)[]) => Promise<keyof ICaptchaProviderRecord>;

export interface IDecoratorCaptchaSceneOptions {
  resolver?: TypeCaptchaSceneOptionsResolver;
  providers: ICaptchaSceneOptionsProviders;
}

declare module 'vona-module-a-onion' {
  export interface BeanOnion {
    captchaScene: ServiceOnion<IDecoratorCaptchaSceneOptions, keyof ICaptchaSceneRecord>;
  }
}

declare module 'vona' {
  export interface ConfigOnions {
    captchaScene: OmitNever<ICaptchaSceneRecord>;
  }

  export interface IBeanSceneRecord {
    captchaScene: never;
  }
}
