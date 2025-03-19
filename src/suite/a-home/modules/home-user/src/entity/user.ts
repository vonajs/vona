import type { ILocalInfos } from 'vona';
import { Entity, EntityBase } from 'vona-module-a-database';
import { Rule, v } from 'vona-module-a-openapi';
import { z } from 'zod';

@Entity('homeUser')
export class EntityUser extends EntityBase {
  @Rule()
  name: string;

  @Rule(v.optional())
  avatar?: string;

  @Rule(z.string().optional())
  locale?: keyof ILocalInfos | undefined;
}
