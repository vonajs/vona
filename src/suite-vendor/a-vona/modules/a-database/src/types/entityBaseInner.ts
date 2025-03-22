import type { IDecoratorEntityOptions } from './onion/entity.ts';
import { BeanBaseSimple, cast } from 'vona';
import { Api } from 'vona-module-a-openapi';

export class EntityBaseInner extends BeanBaseSimple {
  public get $table(): string {
    return cast<IDecoratorEntityOptions>(this.$onionOptions).table!;
  }

  public $column(column: string) {
    return column;
  }

  public $columns(...columns: string[]) {
    return columns;
  }

  @Api.field()
  createdAt: Date;

  @Api.field()
  updatedAt: Date;

  @Api.field()
  deleted: boolean;

  @Api.field()
  iid: number;
}
