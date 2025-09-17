import type { IDecoratorDtoOptions } from 'vona-module-a-web';
import { DtoQueryPageBase } from 'vona-module-a-orm';
import { Dto } from 'vona-module-a-web';

export interface IDtoOptionsOrderQueryPage extends IDecoratorDtoOptions {}

@Dto<IDtoOptionsOrderQueryPage>()
export class DtoOrderQueryPage extends DtoQueryPageBase {}
