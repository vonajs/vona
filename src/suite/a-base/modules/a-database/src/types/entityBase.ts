import { Rule } from 'vona-module-a-validator';
import { z } from 'zod';

export class EntityBase {
  @Rule(z.number())
  id: number;
  @Rule(z.date())
  createdAt: Date;
  @Rule(z.date())
  updatedAt: Date;
  @Rule(z.boolean())
  deleted: boolean;
  @Rule(z.number())
  iid: number;
}
