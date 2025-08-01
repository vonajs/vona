import type { IDecoratorDtoOptions } from 'vona-module-a-web';
import { $Dto } from 'vona-module-a-orm';
import { Dto } from 'vona-module-a-web';

export interface IDtoOptionsUserCreate extends IDecoratorDtoOptions {}

@Dto<IDtoOptionsUserCreate>()
export class DtoUserCreate extends $Dto.create('test-vona:user', { include: { posts: true } }) {}
