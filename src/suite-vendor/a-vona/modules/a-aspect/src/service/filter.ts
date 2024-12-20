import { BeanBase } from 'vona';
import { Service } from 'vona-module-a-web';
import { IFilterComposeContext, IFilterJson, SymbolFilterComposeContext } from '../types/filter.js';

@Service()
export class ServiceFilter extends BeanBase {
  performErrorFilters(err: Error, method: string) {
    this.ctx[SymbolFilterComposeContext] = { err, method };
    this._composeFilters()(this.ctx);
  }

  private _composeFilters() {
    return this.app.bean.onion.filter.compose(
      this.ctx,
      undefined,
      undefined,
      undefined,
      (beanInstance: IFilterJson, options, next) => {
        const filterContext: IFilterComposeContext = this.ctx[SymbolFilterComposeContext];
        if (!beanInstance[filterContext.method]) return next();
        return beanInstance[filterContext.method](filterContext.err, options, next);
      },
    );
  }
}
