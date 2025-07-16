import type { ILocaleInfos } from 'vona';
import type { IDecoratorEntityOptions } from 'vona-module-a-database';
import { Entity, EntityBase } from 'vona-module-a-database';
import { Api, v } from 'vona-module-a-openapi';
import { z } from 'zod';
import { $locale } from '../.metadata/index.ts';

export interface IEntityOptionsUser extends IDecoratorEntityOptions {}

@Entity<IEntityOptionsUser>('homeUser', { openapi: { title: $locale('User') } })
export class EntityUser extends EntityBase {
  @Api.field(v.title($locale('UserName')))
  name: string;

  @Api.field(v.title($locale('UserAvatar')), v.optional())
  avatar?: string;

  @Api.field(v.title($locale('UserLocale')), z.string().optional())
  locale?: keyof ILocaleInfos | undefined;
}
