import type { IDecoratorCaptchaProviderOptions } from '../types/captchaProvider.ts';
import { createBeanDecorator } from 'vona';

export function CaptchaProvider<T extends IDecoratorCaptchaProviderOptions>(options?: T): ClassDecorator {
  return createBeanDecorator('captchaProvider', options);
}
