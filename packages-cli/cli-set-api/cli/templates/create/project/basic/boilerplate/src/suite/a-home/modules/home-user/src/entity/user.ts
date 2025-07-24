import type { ILocaleInfos } from 'vona';
import type { IDecoratorEntityOptions } from 'vona-module-a-orm';
import { Api, v } from 'vona-module-a-openapi';
import { Entity, EntityBase } from 'vona-module-a-orm';
import { z } from 'zod';

export interface IEntityOptionsUser extends IDecoratorEntityOptions {}

@Entity<IEntityOptionsUser>('homeUser')
export class EntityUser extends EntityBase {
  @Api.field()
  name: string;

  @Api.field(v.optional())
  avatar?: string;

  @Api.field(z.string().optional())
  locale?: keyof ILocaleInfos | undefined;
}
