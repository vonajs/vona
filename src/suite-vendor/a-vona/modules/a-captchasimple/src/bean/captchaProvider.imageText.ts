import type { ICaptchaProviderData, ICaptchaProviderExecute, IDecoratorCaptchaProviderOptions } from 'vona-module-a-captcha';
import { getRandomInt } from '@cabloy/utils';
import svgCaptcha, { ConfigObject } from '@zhennann/svg-captcha';
import svg64 from 'svg64';
import { BeanBase, cast } from 'vona';
import { CaptchaProvider } from 'vona-module-a-captcha';
import { __ThisModule__ } from '../.metadata/this.ts';

export type TypeCaptchaProviderImageTextToken = string;
export type TypeCaptchaProviderImageTextPayload = string;
export type TypeCaptchaProviderImageTextData = ICaptchaProviderData<TypeCaptchaProviderImageTextToken, TypeCaptchaProviderImageTextPayload>;

export type TypeCaptchaProviderImageTextType = 'char' | 'math';
const CaptchaProviderImageTextTypes = ['char', 'math'] as const;
export interface ICaptchaProviderOptionsImageText extends IDecoratorCaptchaProviderOptions {
  type?: TypeCaptchaProviderImageTextType;
  fontPath?: string;
  opts: ConfigObject;
}

@CaptchaProvider<ICaptchaProviderOptionsImageText>({
  opts: {
    size: 4,
    color: true,
  },
})
export class CaptchaProviderImageText
  extends BeanBase implements ICaptchaProviderExecute<TypeCaptchaProviderImageTextToken, TypeCaptchaProviderImageTextPayload> {
  async create(options: ICaptchaProviderOptionsImageText): Promise<TypeCaptchaProviderImageTextData> {
    this._confirmFont(options);
    let type = options.type;
    if (!type) {
      type = CaptchaProviderImageTextTypes[getRandomInt(2, 0)];
    }
    const captcha = type === 'char' ? svgCaptcha.create(options.opts) : svgCaptcha.createMathExpr(options.opts);
    return { token: captcha.text, payload: svg64(captcha.data) };
  }

  async verify(
    token: TypeCaptchaProviderImageTextToken,
    tokenInput: TypeCaptchaProviderImageTextToken,
    _options: ICaptchaProviderOptionsImageText,
  ): Promise<boolean> {
    return !!tokenInput && !!token && tokenInput.toLowerCase() === token.toLowerCase();
  }

  private _confirmFont(options: ICaptchaProviderOptionsImageText) {
    if (cast(svgCaptcha.options).font) return;
    const url = options.fontPath || this.app.util.getAssetPathPhysical(__ThisModule__, 'fonts', 'Comismsh.ttf')!;
    svgCaptcha.loadFont(url);
  }
}
