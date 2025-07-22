import type { IDecoratorDtoOptions } from 'vona-module-a-web';
import { $Dto } from 'vona-module-a-database';
import { Dto } from 'vona-module-a-web';

export interface IDtoOptionsCategoryTree extends IDecoratorDtoOptions {}

@Dto<IDtoOptionsCategoryTree>()
export class DtoCategoryTree extends $Dto.compose('test-vona:category', { columns: ['id', 'name'] }) {}
