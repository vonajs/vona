import { BeanBase, Filter, IDecoratorFilterOptions, IFilterJson, Next } from 'vona';

export interface IFilterOptionsBody extends IDecoratorFilterOptions {}

@Filter<IFilterOptionsBody>({ global: true })
export class FilterError extends BeanBase implements IFilterJson {
  json(_err: Error, _options: IDecoratorFilterOptions, next: Next) {
    // next
    return next();
  }
}
