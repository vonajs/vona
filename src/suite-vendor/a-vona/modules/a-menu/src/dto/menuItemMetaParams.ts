import type { IDecoratorDtoOptions } from 'vona-module-a-web';
import { Dto } from 'vona-module-a-web';

export interface IDtoOptionsItemMetaParams extends IDecoratorDtoOptions {}

@Dto<IDtoOptionsItemMetaParams>()
export class DtoMenuItemMetaParams {}
