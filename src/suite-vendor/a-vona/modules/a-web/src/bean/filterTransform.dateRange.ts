import type { IDecoratorFilterTransformOptions, IFilterTransformWhere, IPipeOptionsFilterTransformInfo } from '../types/filterTransform.ts';
import { DateTime } from 'luxon';
import { BeanBase } from 'vona';
import { FilterTransform } from '../lib/decorator/filterTransform.ts';

export interface IFilterTransformOptionsDateRange extends IDecoratorFilterTransformOptions {
  separator: string;
}

@FilterTransform<IFilterTransformOptionsDateRange>({
  separator: '~',
})
export class FilterTransformDateRange extends BeanBase implements IFilterTransformWhere {
  async where(info: IPipeOptionsFilterTransformInfo, options: IFilterTransformOptionsDateRange): Promise<any | undefined> {
    const { value } = info;
    const [dateStartStr, dateEndStr] = value.split(options.separator);
    if (!dateStartStr && !dateEndStr) return;
    //
    const where: any = {};
    if (dateStartStr) {
      const dateStart = DateTime.fromISO(dateStartStr, { zone: this.ctx.tz });
      where._gte_ = dateStart.toJSDate();
    }
    if (dateEndStr) {
      const dateEnd = DateTime.fromISO(dateEndStr, { zone: this.ctx.tz }).plus({ day: 1 });
      where._lt_ = dateEnd.toJSDate();
    }
    return where;
  }
}
