import type { VonaApplication, VonaContext } from 'vona';
import type { ServiceFilter } from 'vona-module-a-aspect';
import { accepts } from '../lib/utils.ts';

export function config(_app: VonaApplication) {
  return {
    error: {
      ssr: {
        site: 'a-ssrcabloy:cabloy',
        pagePath: '/',
      },
      templatePath: '',
      errorPageUrl(_err: Error, _ctx: VonaContext): string | undefined {
        return undefined;
      },
    },
    onerror: {
      accepts(this: VonaContext) {
        const fn = accepts;
        return fn(this as any);
      },
      async log(err: Error, ctx: VonaContext) {
        return await _performErrorFilters(ctx, err, 'log');
      },
      async json(err: Error, ctx: VonaContext) {
        return await _performErrorFilters(ctx, err, 'json');
      },
      async html(err: Error, ctx: VonaContext) {
        return await _performErrorFilters(ctx, err, 'html');
      },
      async text(err: Error, ctx: VonaContext) {
        ctx.body = err.code; // not set err.message for safety
      },
    },
  };
}

async function _performErrorFilters(ctx: VonaContext, err: Error, method: string) {
  return await ctx.app.ctxStorage.run(ctx as any, async () => {
    const beanFilter = ctx.app.bean._getBean('a-aspect.service.filter' as never) as ServiceFilter;
    return await beanFilter.performErrorFilters(err, method);
  });
}
