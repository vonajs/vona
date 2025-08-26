import type { ICaptchaProviderData, ICaptchaProviderExecute, IDecoratorCaptchaProviderOptions } from 'vona-module-a-captcha';
import { getRandomInt } from '@cabloy/utils';
import svg64 from 'svg64';
import svgCaptcha, { ConfigObject } from 'svg-captcha-fixed';
import { BeanBase } from 'vona';
import { CaptchaProvider } from 'vona-module-a-captcha';

export type TypeCaptchaProviderSimpleToken = string;
export type TypeCaptchaProviderSimplePayload = string;
export type TypeCaptchaProviderSimpleData = ICaptchaProviderData<TypeCaptchaProviderSimpleToken, TypeCaptchaProviderSimplePayload>;

export type TypeCaptchaProviderSimpleType = 'char' | 'math';
const CaptchaProviderSimpleTypes = ['char', 'math'] as const;
export interface ICaptchaProviderOptionsSimple extends IDecoratorCaptchaProviderOptions {
  type?: TypeCaptchaProviderSimpleType;
  opts: ConfigObject;
}

@CaptchaProvider<ICaptchaProviderOptionsSimple>({
  opts: {
    size: 4,
    color: true,
  },
})
export class CaptchaProviderSimple
  extends BeanBase implements ICaptchaProviderExecute<TypeCaptchaProviderSimpleToken, TypeCaptchaProviderSimplePayload> {
  async create(options: ICaptchaProviderOptionsSimple): Promise<TypeCaptchaProviderSimpleData> {
    let type = options.type;
    if (!type) {
      type = CaptchaProviderSimpleTypes[getRandomInt(2, 0)];
    }
    const captcha = type === 'char' ? svgCaptcha.create(options.opts) : svgCaptcha.createMathExpr(options.opts);
    return { token: captcha.text, payload: svg64(captcha.data) };
  }

  async verify(
    token: TypeCaptchaProviderSimpleToken,
    tokenInput: TypeCaptchaProviderSimpleToken,
    _options: ICaptchaProviderOptionsSimple,
  ): Promise<boolean> {
    return !!tokenInput && !!token && tokenInput.toLowerCase() === token.toLowerCase();
  }
}
