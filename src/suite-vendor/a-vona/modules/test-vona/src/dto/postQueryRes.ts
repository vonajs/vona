import type { IDecoratorDtoOptions } from 'vona-module-a-web';
import { $Dto } from 'vona-module-a-orm';
import { Dto } from 'vona-module-a-web';
import { ModelPost } from '../model/post.ts';

export interface IDtoOptionsPostQueryRes extends IDecoratorDtoOptions {}

@Dto<IDtoOptionsPostQueryRes>()
export class DtoPostQueryRes extends $Dto.selectAndCount(() => ModelPost, { include: { postContent: true } }) {}
