import { VonaApplication, VonaContext } from 'vona';
import { accepts } from '../lib/utils.js';
import { ServiceFilter } from 'vona-module-a-aspect';

export const config = (_app: VonaApplication) => {
  return {
    accepts: undefined as typeof accepts | undefined,
    appErrorFilter(err: Error, ctx: VonaContext) {
      if (!err) return false;
      _performErrorFilters(ctx, err, 'log');
      return false;
    },
    json(err: Error, ctx: VonaContext) {
      _performErrorFilters(ctx, err, 'json');
    },
    html(err: Error, ctx: VonaContext) {
      _performErrorFilters(ctx, err, 'html');
    },
  };
};

function _performErrorFilters(ctx: VonaContext, err: Error, method: string) {
  return ctx.app.ctxStorage.run(ctx as any, () => {
    const beanFilter = ctx.app.bean._getBean('a-aspect.service.filter' as never) as ServiceFilter;
    return beanFilter.performErrorFilters(err, method);
  });
}
