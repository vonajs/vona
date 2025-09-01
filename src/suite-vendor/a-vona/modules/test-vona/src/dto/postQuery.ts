import type { IDecoratorDtoOptions } from 'vona-module-a-web';
import {  $Dto  } from 'vona-module-a-orm';
import { Dto } from 'vona-module-a-web';
import { EntityPost } from '../entity/post.ts';

export interface IDtoOptionsPostQuery extends IDecoratorDtoOptions {}

@Dto<IDtoOptionsPostQuery>()
export class DtoPostQuery extends $Dto.queryPage(EntityPost,['title','createdAt']) {
  tt() {
    this.
  }
}
