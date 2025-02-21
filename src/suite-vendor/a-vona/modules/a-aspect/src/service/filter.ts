import type { IFilterComposeData, IFilterJson } from '../types/filter.ts';
import { BeanBase } from 'vona';
import { Service } from 'vona-module-a-web';

@Service()
export class ServiceFilter extends BeanBase {
  performErrorFilters(err: Error, method: string) {
    const filterContext: IFilterComposeData = { err, method };
    this._composeFilters()(filterContext);
  }

  private _composeFilters() {
    return this.app.bean.onion.filter.compose(
      this.ctx,
      undefined,
      undefined,
      undefined,
      (beanInstance: IFilterJson, data: IFilterComposeData, options, next) => {
        if (!beanInstance[data.method]) return next();
        return beanInstance[data.method](data.err, options, next);
      },
    );
  }
}
