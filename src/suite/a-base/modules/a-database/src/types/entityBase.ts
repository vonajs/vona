import { BeanBaseSimple, cast, IDecoratorEntityOptions } from 'vona';
import { Rule } from 'vona-module-a-validator';
import { z } from 'zod';

export class EntityBase extends BeanBaseSimple {
  public get table(): string {
    return cast<IDecoratorEntityOptions>(this.onionOptions).table!;
  }

  public column(column: string) {
    return column;
  }
  public columns(...columns: string[]) {
    return columns;
  }

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
