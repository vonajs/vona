import type { IDecoratorDtoOptions } from 'vona-module-a-web';
import { $Dto } from 'vona-module-a-orm';
import { Dto } from 'vona-module-a-web';
import { ModelOrder } from 'vona-module-test-vona';

export interface IDtoOptionsOrderResultPage extends IDecoratorDtoOptions {}

@Dto<IDtoOptionsOrderResultPage>()
export class DtoOrderResultPage extends $Dto.selectAndCount(() => ModelOrder) {}
