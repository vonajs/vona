import { appResource, BeanBaseSimple, IDecoratorEntityOptions } from 'vona';
import { Rule } from 'vona-module-a-validator';
import { z } from 'zod';

export class EntityBase extends BeanBaseSimple {
  protected get beanOptions() {
    return appResource.getBean((<any>this).__beanFullName__)!;
  }
  protected get entityOptions(): IDecoratorEntityOptions {
    return this.beanOptions.options as IDecoratorEntityOptions;
  }

  public get table(): string {
    return this.entityOptions.table!;
  }

  protected column(column: string) {
    return column;
  }
  protected columns(...columns: string[]) {
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
