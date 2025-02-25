import type { VonaApplication, VonaContext } from 'vona';
import type { ServiceFilter } from 'vona-module-a-aspect';
import { accepts } from '../lib/utils.ts';

export function config(_app: VonaApplication) {
  return {
    error: {
      templatePath: '',
      appErrorFilter(err: Error, ctx: VonaContext) {
        if (!err) return false;
        _performErrorFilters(ctx, err, 'log');
        return false;
      },
      errorPageUrl(_err: Error, _ctx: VonaContext): string | undefined {
        return undefined;
      },
    },
    onerror: {
      accepts(this: VonaContext) {
        const fn = accepts;
        return fn(this as any);
      },
      js(err: Error, ctx: VonaContext) {
        _performErrorFilters(ctx, err, 'json');
        if (ctx.createJsonpBody) {
          ctx.createJsonpBody(ctx.body);
        }
      },
      json(err: Error, ctx: VonaContext) {
        _performErrorFilters(ctx, err, 'json');
      },
      html(err: Error, ctx: VonaContext) {
        _performErrorFilters(ctx, err, 'html');
      },
      text(err: Error, ctx: VonaContext) {
        ctx.body = err.code; // not set err.message for safety
      },
    },
  };
}

function _performErrorFilters(ctx: VonaContext, err: Error, method: string) {
  return ctx.app.ctxStorage.run(ctx as any, () => {
    const beanFilter = ctx.app.bean._getBean('a-aspect.service.filter' as never) as ServiceFilter;
    return beanFilter.performErrorFilters(err, method);
  });
}
