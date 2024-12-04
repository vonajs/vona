import { appResource, IDecoratorEntityOptions } from 'vona';
import { Rule } from 'vona-module-a-validator';
import { z } from 'zod';

export class EntityBase {
  protected get __beanOptions() {
    return appResource.getBean((<any>this).__beanFullName__);
  }
  protected get __entityOptions(): IDecoratorEntityOptions {
    return this.__beanOptions?.options as IDecoratorEntityOptions;
  }

  getTable(): string {
    return this.__entityOptions.table!;
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
