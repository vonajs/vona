import type { IDecoratorDtoOptions } from 'vona-module-a-web';
import { DtoQueryBase } from 'vona-module-a-orm';
import { Dto } from 'vona-module-a-web';

export interface IDtoOptionsOrderQuery extends IDecoratorDtoOptions {}

@Dto<IDtoOptionsOrderQuery>()
export class DtoOrderQuery extends DtoQueryBase {}
