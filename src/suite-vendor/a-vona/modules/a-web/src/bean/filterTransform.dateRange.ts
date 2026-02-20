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
      const dateStart = this._parseDate(dateStartStr);
      where._gte_ = dateStart.toJSDate();
    }
    if (dateEndStr) {
      const dateEnd = this._parseDate(dateEndStr).plus({ day: 1 });
      where._lt_ = dateEnd.toJSDate();
    }
    return where;
  }

  private _parseDate(str: string) {
    let date = DateTime.fromISO(str, { zone: this.ctx.tz });
    if (!date.isValid) {
      date = DateTime.fromFormat(str, 'M/dd/yyyy', { zone: this.ctx.tz });
    }
    return date;
  }
}
