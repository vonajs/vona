import performActionFn from './performAction.js';
import { BeanSimple } from '../bean/beanSimple.js';
import { VonaContext, PowerPartial, HttpStatus, RouteHandlerArgumentMeta } from '../../types/index.js';
import { IExecuteBeanCallback } from './util.js';
import { appResource } from '../core/resource.js';

export class CtxUtil extends BeanSimple {
  runInBackground(scope) {
    const ctx = this.ctx;
    ctx.runInBackground(async () => {
      await ctx.meta.util.executeBeanIsolate({
        fn: async ({ ctx }) => {
          await scope({ ctx });
        },
      });
    });
  }

  async lock({ subdomain, resource, fn, options, redlock }: any) {
    const ctx = this.ctx;
    if (subdomain === undefined) subdomain = ctx.subdomain;
    return await ctx.app.meta.util.lock({ subdomain, resource, fn, options, redlock });
  }

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

  queuePush(info) {
    const ctx = this.ctx;
    ctx.app.meta.queue.push(this._queuePushInfoPrepare(info));
  }

  async queuePushAsync(info) {
    const ctx = this.ctx;
    return await ctx.app.meta.queue.pushAsync(this._queuePushInfoPrepare(info));
  }

  _queuePushInfoPrepare(info) {
    const ctx = this.ctx;
    const dbLevel = !info.dbLevel ? ctx.dbLevel + 1 : info.dbLevel;
    const locale = info.locale === undefined ? ctx.locale : info.locale;
    const subdomain = info.subdomain === undefined ? ctx.subdomain : info.subdomain;
    // new info
    info = {
      ...info,
      dbLevel,
      locale,
      subdomain,
    };
    if (!info.ctxParent) info.ctxParent = {};
    if (!info.ctxParent.request) info.ctxParent.request = {};
    if (!info.ctxParent.request.headers) info.ctxParent.request.headers = {};
    // headers
    const headers = info.ctxParent.request.headers;
    for (const key of ['x-clientid', 'x-scene']) {
      if (!headers[key]) {
        const value =
          key === 'x-clientid' ? (<any>ctx.bean).util.getFrontClientId() : (<any>ctx.bean).util.getFrontScene();
        if (value) {
          headers[key] = value;
        }
      }
    }
    for (const key of ['host', 'origin', 'referer', 'user-agent']) {
      if (!headers[key]) {
        const value = ctx.request.headers[key];
        if (value) {
          headers[key] = value;
        }
      }
    }
    // ok
    return info;
  }

  async executeBean({
    locale,
    subdomain,
    beanModule,
    beanFullName,
    context,
    args,
    fn,
    transaction,
    instance,
  }: {
    locale?: string;
    subdomain?: string;
    beanModule?: string;
    beanFullName?: string;
    context?: any;
    args?: any[] | any;
    fn?: IExecuteBeanCallback | string;
    transaction?: boolean;
    instance?: boolean;
  }) {
    const ctx = this.ctx;
    return await ctx.app.meta.util.executeBean({
      locale: locale === undefined ? ctx.locale : locale,
      subdomain: subdomain === undefined ? ctx.subdomain : subdomain,
      context,
      args,
      beanModule,
      beanFullName,
      transaction,
      fn,
      ctxCaller: ctx,
      instance,
    });
  }

  async executeBeanIsolate({
    locale,
    subdomain,
    beanModule,
    beanFullName,
    context,
    args,
    fn,
    transaction,
    ctxParent,
    instance,
  }: {
    locale?: string;
    subdomain?: string | null | undefined;
    beanModule?: string;
    beanFullName?: string;
    context?: any;
    args?: any[] | any;
    fn?: IExecuteBeanCallback | string;
    transaction?: boolean;
    ctxParent?: PowerPartial<VonaContext>;
    instance?: boolean;
  }) {
    const ctx = this.ctx;
    if (ctxParent) {
      if (ctxParent.dbLevel === undefined) {
        ctxParent = {
          ...ctxParent,
          dbLevel: ctx.dbLevel,
        };
      }
    } else {
      ctxParent = ctx as unknown as PowerPartial<VonaContext>;
    }
    return await ctx.app.meta.util.executeBean({
      locale: locale === undefined ? ctx.locale : locale,
      subdomain: subdomain === undefined ? ctx.subdomain : subdomain,
      context,
      args,
      beanModule,
      beanFullName,
      transaction,
      fn,
      ctxParent,
      instance,
    });
  }

  async performAction({ innerAccess, method, url, query, params, headers, body }: any) {
    const ctx = this.ctx;
    return await performActionFn({
      ctxCaller: ctx,
      innerAccess,
      method,
      url,
      query,
      params,
      headers,
      body,
    });
  }

  throwValidationFailed(code: HttpStatus, message: string, metadata: RouteHandlerArgumentMeta) {
    if (!this.app.meta.isProd) {
      const beanOptions = appResource.getBean(metadata.controller);
      message = `${message}: ${this.ctx.text('ValidationFailedDev', beanOptions?.beanFullName, metadata.method, metadata.index)}`;
    }
    this.app.throw(code, message);
  }
}
