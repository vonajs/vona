import { Entity, EntityBase } from 'vona-module-a-database';
import { Rule } from 'vona-module-a-validator';
import { z } from 'zod';

@Entity('aStatus')
export class EntityStatus extends EntityBase {
  @Rule(z.string())
  module: string;
  @Rule(z.string())
  name: string;
  @Rule(z.string())
  value: string;
}
