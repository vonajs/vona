import type { IDecoratorDtoOptions } from 'vona-module-a-web';
import { Dto } from 'vona-module-a-web';

export interface IDtoOptionsCaptchaData extends IDecoratorDtoOptions {}

@Dto<IDtoOptionsCaptchaData>()
export class DtoCaptchaData {

}
