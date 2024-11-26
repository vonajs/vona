import { BeanBase, Cast, Filter, IDecoratorFilterOptionsGlobal, IFilterJson, IFilterLog, NextSync } from 'vona';

export interface IFilterOptionsError extends IDecoratorFilterOptionsGlobal {
  logs: Record<number | string, boolean>;
}

@Filter<IFilterOptionsError>({ global: true, logs: {} })
export class FilterError extends BeanBase implements IFilterJson, IFilterLog {
  json(err: Error, _options: IFilterOptionsError, next: NextSync): boolean {
    // next
    if (next() === true) return true;

    const status = this.app.meta.util.detectStatus(err);

    this.ctx.status = status;
    const code = err.code ?? err.status;
    const message = this.app.meta.util.detectErrorMessage(err);

    // json error
    const errorJson = {
      code,
      message,
    } as any;
    if (Cast(err).errors) {
      errorJson.errors = Cast(err).errors;
    }

    if (status >= 500 && !this.app.meta.isProd) {
      // provide detail error stack in local env
      errorJson.stack = err.stack;
      errorJson.name = err.name;
      for (const key in err) {
        if (!['status'].includes(key) && !errorJson[key]) {
          errorJson[key] = err[key];
        }
      }
    }

    this.ctx.body = errorJson;

    // handled
    return true;
  }

  log(err: Error, options: IFilterOptionsError, next: NextSync): boolean {
    // 403->401
    if (err.code === 403) {
      // todo: use diffrent state user
      const user = this.ctx && this.ctx.state && Cast(this.ctx.state).user;
      if (user && user.op.anonymous) {
        err.code = 401;
        err.status = 401;
      }
    }

    // message
    if (err.message && typeof err.message !== 'string') {
      err.message = JSON.stringify(err.message, null, 2);
    }

    // next
    if (next() === true) return true;

    // todo: use new log engine
    if (options.logs[err.code!] !== false) {
      console.error(err);
    }

    // handled
    return true;
  }
}
