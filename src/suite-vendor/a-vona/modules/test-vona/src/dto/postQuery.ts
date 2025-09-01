import type { IDecoratorDtoOptions } from 'vona-module-a-web';
import { Dto } from 'vona-module-a-web';

export interface IDtoOptionsPostQuery extends IDecoratorDtoOptions {}

@Dto<IDtoOptionsPostQuery>()
export class DtoPostQuery {}
