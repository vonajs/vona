import type { IDecoratorDtoOptions } from 'vona-module-a-web';
import { Dto } from 'vona-module-a-web';

export interface IDtoOptionsPaypalOrderRecordOptions extends IDecoratorDtoOptions {}

@Dto<IDtoOptionsPaypalOrderRecordOptions>()
export class DtoPaypalOrderRecordOptions {}
