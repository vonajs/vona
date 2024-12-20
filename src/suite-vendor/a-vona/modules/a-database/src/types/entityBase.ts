import { BeanBaseSimple, cast } from 'vona';
import { Rule } from 'vona-module-a-validator';
import { IDecoratorEntityOptions } from './onionEntity.js';

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

  @Rule()
  id: number;
  @Rule()
  createdAt: Date;
  @Rule()
  updatedAt: Date;
  @Rule()
  deleted: boolean;
  @Rule()
  iid: number;
}
