import { BeanBase, VonaContext } from 'vona';
import { Service } from 'vona-module-a-web';
import { IFilterComposeContext, IFilterJson, SymbolFilterComposeContext } from '../types/filter.js';

@Service()
export class ServiceFilter extends BeanBase {
  performErrorFilters(ctx: VonaContext, err: Error, method: string) {
    return this.app.ctxStorage.run(ctx as any, () => {
      ctx[SymbolFilterComposeContext] = { err, method };
      this._composeFilters(ctx)(ctx);
    });
  }

  _composeFilters(ctx: VonaContext) {
    return this.app.bean.onion.filter.compose(
      ctx,
      undefined,
      undefined,
      undefined,
      (beanInstance: IFilterJson, options, next) => {
        const filterContext: IFilterComposeContext = ctx[SymbolFilterComposeContext];
        if (!beanInstance[filterContext.method]) return next();
        return beanInstance[filterContext.method](filterContext.err, options, next);
      },
    );
  }
}
