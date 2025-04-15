import type { IDecoratorEntityOptions } from './onion/entity.ts';
import { BeanBaseSimple, cast } from 'vona';

export class EntityBaseEmpty extends BeanBaseSimple {
  public get $table(): string {
    return cast<IDecoratorEntityOptions>(this.$onionOptions).table!;
  }

  public $column(column: string) {
    return column;
  }

  public $columns(...columns: string[]) {
    return columns;
  }
}
