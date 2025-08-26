import type { ICaptchaProviderData, ICaptchaProviderExecute, IDecoratorCaptchaProviderOptions } from 'vona-module-a-captcha';
import svgCaptcha from 'svg-captcha-fixed';
import { BeanBase } from 'vona';
import { CaptchaProvider } from 'vona-module-a-captcha';

export type TypeCaptchaProviderSimpleToken = string;
export type TypeCaptchaProviderSimplePayload = string;
export type TypeCaptchaProviderSimpleData = ICaptchaProviderData<TypeCaptchaProviderSimpleToken, TypeCaptchaProviderSimplePayload>;

export interface ICaptchaProviderOptionsSimple extends IDecoratorCaptchaProviderOptions {}

@CaptchaProvider<ICaptchaProviderOptionsSimple>()
export class CaptchaProviderSimple
  extends BeanBase implements ICaptchaProviderExecute<TypeCaptchaProviderSimpleToken, TypeCaptchaProviderSimplePayload> {
  async create(_options: ICaptchaProviderOptionsSimple): Promise<TypeCaptchaProviderSimpleData> {
    const captcha = svgCaptcha.create();
    return { token: captcha.text, payload: captcha.data };
  }

  async verify(
    token: TypeCaptchaProviderSimpleToken,
    tokenInput: TypeCaptchaProviderSimpleToken,
    _options: ICaptchaProviderOptionsSimple,
  ): Promise<boolean> {
    return !!tokenInput && !!token && tokenInput.toLowerCase() === token.toLowerCase();
  }
}
