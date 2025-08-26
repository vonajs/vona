import type { ICaptchaProviderData, ICaptchaProviderExecute, IDecoratorCaptchaProviderOptions } from 'vona-module-a-captcha';
import svgCaptcha, { ConfigObject } from 'svg-captcha-fixed';
import { BeanBase } from 'vona';
import { CaptchaProvider } from 'vona-module-a-captcha';

export type TypeCaptchaProviderSimpleToken = string;
export type TypeCaptchaProviderSimplePayload = string;
export type TypeCaptchaProviderSimpleData = ICaptchaProviderData<TypeCaptchaProviderSimpleToken, TypeCaptchaProviderSimplePayload>;

export type TypeCaptchaProviderSimpleType = 'char' | 'math';
export interface ICaptchaProviderOptionsSimple extends IDecoratorCaptchaProviderOptions {
  type: TypeCaptchaProviderSimpleType;
  opts: ConfigObject;
}

@CaptchaProvider<ICaptchaProviderOptionsSimple>({
  type: 'char',
  opts: {
    size: 4,
    color: true,
    noise: 3,
  },
})
export class CaptchaProviderSimple
  extends BeanBase implements ICaptchaProviderExecute<TypeCaptchaProviderSimpleToken, TypeCaptchaProviderSimplePayload> {
  async create(options: ICaptchaProviderOptionsSimple): Promise<TypeCaptchaProviderSimpleData> {
    const captcha = options.type === 'char' ? svgCaptcha.create(options.opts) : svgCaptcha.createMathExpr(options.opts);
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
