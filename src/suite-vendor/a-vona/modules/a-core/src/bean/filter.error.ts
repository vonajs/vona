import { BeanBase, Filter, IDecoratorFilterOptions, IFilterJson, Next } from 'vona';

export interface IFilterOptionsError extends IDecoratorFilterOptions {}

@Filter<IFilterOptionsError>({ global: true })
export class FilterError extends BeanBase implements IFilterJson {
  json(_err: Error, _options: IFilterOptionsError, next: Next) {
    // next
    return next();
  }
}
