import type { IDecoratorFilterTransformOptions, IFilterTransformWhere, IPipeOptionsFilterTransformInfo } from '../types/filterTransform.ts';
import { DateTime } from 'luxon';
import { BeanBase } from 'vona';
import { FilterTransform } from '../lib/decorator/filterTransform.ts';

export interface IFilterTransformOptionsDateRange extends IDecoratorFilterTransformOptions {}

@FilterTransform<IFilterTransformOptionsDateRange>()
export class FilterTransformDateRange extends BeanBase implements IFilterTransformWhere {
  async where(info: IPipeOptionsFilterTransformInfo, _options: IFilterTransformOptionsDateRange): Promise<boolean> {
    const { params, fullName, value } = info;
    const [dateStartStr, dateEndStr] = value.split('~');
    const dateStart = DateTime.fromISO(dateStartStr, { zone: this.ctx.tz });
    const dateEnd = DateTime.fromISO(dateEndStr, { zone: this.ctx.tz }).plus({ day: 1 });
    params.where[fullName] = {
      _gte_: dateStart.toJSDate(),
      _lt_: dateEnd.toJSDate(),
    };
    return true;
  }
}
