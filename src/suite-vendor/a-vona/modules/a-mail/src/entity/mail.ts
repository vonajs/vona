import type { IDecoratorEntityOptions } from 'vona-module-a-orm';
import type { IMailClientRecord, IMailOptions } from '../types/config.ts';
import { Api, v } from 'vona-module-a-openapi';
import { Entity, EntityBase } from 'vona-module-a-orm';
import z from 'zod';

export interface IEntityOptionsMail extends IDecoratorEntityOptions {}

@Entity<IEntityOptionsMail>('mail')
export class EntityMail extends EntityBase {
  @Api.field(z.string().optional())
  client?: keyof IMailClientRecord;

  @Api.field(v.optional())
  from?: string;

  @Api.field(v.optional())
  to?: string;

  @Api.field(v.optional())
  subject?: string;

  @Api.field()
  message: IMailOptions;
}
