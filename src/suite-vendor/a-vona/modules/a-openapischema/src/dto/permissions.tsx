import type { IDecoratorDtoOptions } from 'vona-module-a-web';
import { Dto } from 'vona-module-a-web';

export interface IDtoOptionsPermissions extends IDecoratorDtoOptions {}

@Dto<IDtoOptionsPermissions>()
export class DtoPermissions {

}
