import type { OmitNever } from 'vona';
import type { ServiceOnion, TypeOnionOptionsEnableSimple } from 'vona-module-a-onion';

export interface ICaptchaProviderRecord {}

export interface ICaptchaProviderExecute<TOKEN = any, PAYLOAD = any> {
  create(options: IDecoratorCaptchaProviderOptions): Promise<ICaptchaProviderData<TOKEN, PAYLOAD>>;
  verify(token: TOKEN, tokenInput: TOKEN, options: IDecoratorCaptchaProviderOptions): Promise<boolean>;
}

export interface ICaptchaProviderData<TOKEN = any, PAYLOAD = any> {
  token: TOKEN;
  payload: PAYLOAD;
}

export interface IDecoratorCaptchaProviderOptions extends TypeOnionOptionsEnableSimple {}

declare module 'vona-module-a-onion' {
  export interface BeanOnion {
    captchaProvider: ServiceOnion<IDecoratorCaptchaProviderOptions, keyof ICaptchaProviderRecord>;
  }
}

declare module 'vona' {
  export interface ConfigOnions {
    captchaProvider: OmitNever<ICaptchaProviderRecord>;
  }

  export interface IBeanSceneRecord {
    captchaProvider: never;
  }
}
