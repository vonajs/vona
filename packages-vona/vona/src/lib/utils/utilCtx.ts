import { BeanSimple } from '../bean/beanSimple.js';

export class CtxUtil extends BeanSimple {
  broadcastEmit({ locale, subdomain, module, broadcastName, data }: any) {
    const ctx = this.ctx;
    ctx.app.meta.broadcast.emit({
      locale: locale === undefined ? ctx.locale : locale,
      subdomain: subdomain === undefined ? ctx.subdomain : subdomain,
      module,
      broadcastName,
      data,
    });
  }
}
