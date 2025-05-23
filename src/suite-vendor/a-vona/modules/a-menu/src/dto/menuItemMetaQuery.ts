import type { IDecoratorDtoOptions } from 'vona-module-a-web';
import { Dto } from 'vona-module-a-web';

export interface IDtoOptionsItemMetaQuery extends IDecoratorDtoOptions {}

@Dto<IDtoOptionsItemMetaQuery>()
export class DtoMenuItemMetaQuery {}
