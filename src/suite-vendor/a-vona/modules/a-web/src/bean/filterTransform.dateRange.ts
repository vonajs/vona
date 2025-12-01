import type { IDecoratorFilterTransformOptions, IFilterTransformWhere, IPipeOptionsFilterTransformInfo } from '../types/filterTransform.ts';
import { BeanBase } from 'vona';
import { FilterTransform } from '../lib/decorator/filterTransform.ts';

export interface IFilterTransformOptionsDateRange extends IDecoratorFilterTransformOptions {}

@FilterTransform<IFilterTransformOptionsDateRange>()
export class FilterTransformDateRange extends BeanBase implements IFilterTransformWhere {
  async where(_info: IPipeOptionsFilterTransformInfo, _options: IFilterTransformOptionsDateRange): Promise<boolean> {
    return false;
  }
}
