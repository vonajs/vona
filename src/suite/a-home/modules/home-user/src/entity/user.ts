import type { ILocalInfos } from 'vona';
import { Entity, EntityBase } from 'vona-module-a-database';
import { Api, v } from 'vona-module-a-openapi';
import { z } from 'zod';

@Entity('homeUser')
export class EntityUser extends EntityBase {
  @Api.field()
  name: string;

  @Api.field(v.optional())
  avatar?: string;

  @Api.field(z.string().optional())
  locale?: keyof ILocalInfos | undefined;
}
