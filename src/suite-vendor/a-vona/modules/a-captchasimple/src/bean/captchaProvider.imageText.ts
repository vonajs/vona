import type { ICaptchaProviderData, ICaptchaProviderExecute, IDecoratorCaptchaProviderOptions } from 'vona-module-a-captcha';
import { getRandomInt } from '@cabloy/utils';
import svgCaptcha, { ConfigObject } from '@zhennann/svg-captcha';
import svg64 from 'svg64';
import { BeanBase, cast } from 'vona';
import { CaptchaProvider } from 'vona-module-a-captcha';
import { __ThisModule__ } from '../.metadata/this.ts';

export type TypeCaptchaProviderSimpleToken = string;
export type TypeCaptchaProviderSimplePayload = string;
export type TypeCaptchaProviderSimpleData = ICaptchaProviderData<TypeCaptchaProviderSimpleToken, TypeCaptchaProviderSimplePayload>;

export type TypeCaptchaProviderSimpleType = 'char' | 'math';
const CaptchaProviderSimpleTypes = ['char', 'math'] as const;
export interface ICaptchaProviderOptionsSimple extends IDecoratorCaptchaProviderOptions {
  type?: TypeCaptchaProviderSimpleType;
  fontPath?: string;
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
    this._confirmFont(options);
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

  private _confirmFont(options: ICaptchaProviderOptionsSimple) {
    if (cast(svgCaptcha.options).font) return;
    const url = options.fontPath || this.app.util.getAssetPathPhysical(__ThisModule__, 'fonts', 'Comismsh.ttf')!;
    svgCaptcha.loadFont(url);
  }
}
