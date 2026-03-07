import type { IDecoratorDtoOptions } from 'vona-module-a-web';
import { Dto } from 'vona-module-a-web';

export interface IDtoOptionsPaypalOrderRecordPayload extends IDecoratorDtoOptions {}

@Dto<IDtoOptionsPaypalOrderRecordPayload>()
export class DtoPaypalOrderRecordPayload {}
