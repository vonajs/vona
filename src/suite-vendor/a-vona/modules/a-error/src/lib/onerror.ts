import http from 'node:http';
import { format } from 'node:util';
import { sendToWormhole } from 'stream-wormhole';

export type OnerrorError = Error & {
  status: number;
  headers?: Record<string, string>;
  expose?: boolean;
};

export type OnerrorHandler = (err: OnerrorError, ctx: any) => void;

export interface OnerrorOptions {
  text?: OnerrorHandler;
  json?: OnerrorHandler;
  html?: OnerrorHandler;
  all?: OnerrorHandler;
  js?: OnerrorHandler;
  redirect?: string | null;
  accepts?: (...args: string[]) => string;
}

const defaultOptions: OnerrorOptions = {};

export function onerror(app: any, options?: OnerrorOptions) {
  options = { ...defaultOptions, ...options };

  app.context.onerror = async function (err: any) {
    // don't do anything if there is no error.
    // this allows you to pass `this.onerror`
    // to node-style callbacks.
    if (err == null) {
      return;
    }

    // ignore all padding request stream
    if (this.req) {
      sendToWormhole(this.req);
    }

    // wrap non-error object
    if (!(err instanceof Error)) {
      let errMsg = err;
      if (typeof err === 'object') {
        try {
          errMsg = JSON.stringify(err);
        } catch (e) {
          errMsg = format('%s', e);
        }
      }
      const newError = new Error(`non-error thrown: ${errMsg}`);
      // err maybe an object, try to copy the name, message and stack to the new error instance
      if (err) {
        if (err.name) newError.name = err.name;
        if (err.message) newError.message = err.message;
        if (err.stack) newError.stack = err.stack;
        if (err.status) {
          Reflect.set(newError, 'status', err.status);
        }
        if (err.headers) {
          Reflect.set(newError, 'headers', err.headers);
        }
      }
      err = newError;
    }

    const headerSent = this.headerSent || !this.writable;
    if (headerSent) {
      err.headerSent = true;
    }

    // log filter, need not app.emit('error')
    await (options as any).log.call(this, err, this);

    // nothing we can do here other
    // than delegate to the app-level
    // handler and log.
    if (headerSent) return;

    // ENOENT support
    if (err.code === 'ENOENT') {
      err.status = 404;
    }

    if (typeof err.status !== 'number' || !http.STATUS_CODES[err.status]) {
      err.status = 500;
    }
    this.status = err.status;

    this.set(err.headers);
    let type = 'text';
    if (options.accepts) {
      type = options.accepts.call(this, 'html', 'text', 'json');
    } else {
      type = this.accepts('html', 'text', 'json');
    }
    type = type || 'text';
    if (options.all) {
      options.all.call(this, err, this);
    } else {
      if (options.redirect && type !== 'json') {
        this.redirect(options.redirect);
      } else {
        await (options as any)[type].call(this, err, this);
        this.type = type;
      }
    }

    if (type === 'json') {
      this.body = JSON.stringify(this.body);
    }
    this.res.end(this.body);
  };

  return app;
}
