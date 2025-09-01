import type { IDecoratorControllerOptions } from 'vona-module-a-web';
import type { EntityPost } from '../entity/post.ts';
import { BeanBase } from 'vona';
import { Controller } from 'vona-module-a-web';

export interface IControllerOptionsPost extends IDecoratorControllerOptions {}

@Controller<IControllerOptionsPost>('post', { meta: { mode: ['test', 'dev'] } })
export class ControllerPost extends BeanBase {
  async findMany(): Promise<EntityPost[]> {
    return await this.scope.service.post.findMany();
  }
}
