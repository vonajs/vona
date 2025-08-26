import type { ICaptchaProviderData, ICaptchaProviderExecute, IDecoratorCaptchaProviderOptions } from 'vona-module-a-captcha';
import { BeanBase } from 'vona';
import { CaptchaProvider } from 'vona-module-a-captcha';

export type TypeCaptchaProviderSimpleToken = any;
export type TypeCaptchaProviderSimplePayload = any;
export type TypeCaptchaProviderSimpleData = ICaptchaProviderData<TypeCaptchaProviderSimpleToken, TypeCaptchaProviderSimplePayload>;

export interface ICaptchaProviderOptionsSimple extends IDecoratorCaptchaProviderOptions {}

@CaptchaProvider<ICaptchaProviderOptionsSimple>()
export class CaptchaProviderSimple extends BeanBase implements ICaptchaProviderExecute {
  async create(_options: ICaptchaProviderOptionsSimple): Promise<TypeCaptchaProviderSimpleData> {
    throw new Error('Not Implemented');
  }

  async verify(_options: ICaptchaProviderOptionsSimple): Promise<boolean> {
    return false;
  }
}
