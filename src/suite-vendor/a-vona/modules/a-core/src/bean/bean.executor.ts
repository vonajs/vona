import { Bean, BeanBase, ILocalInfos, VonaContext } from 'vona';

@Bean()
export class BeanExecutor extends BeanBase {
  async runInAnonymousContextScope<T>(
    scope: (ctx: VonaContext) => Promise<T>,
    {
      locale,
      subdomain,
      module,
      instance,
    }: { locale?: keyof ILocalInfos; subdomain?: string | null | undefined; module?: string; instance?: boolean },
  ): Promise<T> {
    // url
    // todo: remove /api/a/base, need not set url
    const url = module ? this.app.meta.util.combineApiPath(module, '', true, false) : '/api/a/base/';
    const req = {
      method: 'post',
      url,
    };
    return await this.app.runInAnonymousContextScope(async ctx => {
      (<any>ctx.req).ctx = ctx;
      // locale
      Object.defineProperty(ctx, 'locale', {
        get() {
          return locale || this.app.config.i18n.defaultLocale;
        },
      });
      // subdomain
      Object.defineProperty(ctx, 'subdomain', {
        get() {
          return subdomain;
        },
      });
      // instance
      if (subdomain !== undefined && subdomain !== null) {
        ctx.instance = await this.bean.instance.get(subdomain);
        // start instance
        if (instance) {
          await this.$scope.instance.service.instance.checkAppReadyInstance(true);
        }
      }
      // scope
      const res = await scope(ctx as unknown as VonaContext);
      // tail done
      await ctx.tailDone();
      // ok
      return res;
    }, req as any);
  }
}
