import type { IDecoratorCaptchaSceneOptions } from '../types/captchaScene.ts';
import { createBeanDecorator } from 'vona';

export function CaptchaScene(options: IDecoratorCaptchaSceneOptions): ClassDecorator {
  return createBeanDecorator('captchaScene', options);
}
