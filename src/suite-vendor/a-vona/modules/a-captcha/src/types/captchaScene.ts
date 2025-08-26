import type { OmitNever } from 'vona';
import type { ServiceOnion } from 'vona-module-a-onion';

export interface ICaptchaSceneRecord {}

export interface IDecoratorCaptchaSceneOptions {}

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
