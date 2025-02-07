import fs from 'node:fs';
import path from 'node:path';
import { BeanBase, cast, HttpStatus, NextSync } from 'vona';
import { Filter, IDecoratorFilterOptionsGlobal, IFilterHtml, IFilterJson, IFilterLog } from 'vona-module-a-aspect';

export interface IFilterOptionsError extends IDecoratorFilterOptionsGlobal {
  logs: Record<number | string, boolean>;
}

const __cacheViewTemplates: Record<string, any> = {};

@Filter<IFilterOptionsError>({ global: true, logs: {} })
export class FilterError extends BeanBase implements IFilterLog, IFilterJson, IFilterHtml {
  log(err: Error, options: IFilterOptionsError, next: NextSync): boolean {
    // 403->401
    if (err.code === 403) {
      if (!this.bean.passport.isAuthenticated) {
        err.code = 401;
        err.status = 401;
      }
    }

    // message
    if (err.message && typeof err.message !== 'string') {
      if (this.app.meta.isProd) {
        err.message = JSON.stringify(err.message);
      } else {
        err.message = JSON.stringify(err.message, null, 2);
      }
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

  json(err: Error, _options: IFilterOptionsError, next: NextSync): boolean {
    // next
    if (next() === true) return true;

    const status = this.app.util.detectStatus(err);

    this.ctx.status = status;
    const code = err.code ?? err.status;
    const message = this.app.util.detectErrorMessage(err);

    // json error
    const errorJson = {
      code,
      message,
    } as any;
    if (cast(err).errors) {
      errorJson.errors = cast(err).errors;
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

  html(err: Error, _options: IFilterOptionsError, next: NextSync): boolean {
    // next
    if (next() === true) return true;

    const status = this.app.util.detectStatus(err);
    const errorPageUrl =
      typeof this.app.config.errorPageUrl === 'function'
        ? this.app.config.errorPageUrl(err, this)
        : this.app.config.errorPageUrl;

    // keep the real response status
    this.ctx.realStatus = status;
    // don't respond any error message in production env
    if (this.app.meta.isProd) {
      // 5xx
      if (status >= 500) {
        if (errorPageUrl) {
          const statusQuery = (errorPageUrl.indexOf('?') > 0 ? '&' : '?') + `real_status=${status}`;
          this.ctx.redirect(errorPageUrl + statusQuery);
          return true;
        }
        this.ctx.status = 500;
        this.ctx.body = `<h2>Internal Server Error, real status: ${status}</h2>`;
        return true;
      }
      // 4xx
      this.ctx.status = status;
      this.ctx.body = `<h2>${status} ${HttpStatus[status]}</h2>`;
      return true;
    }
    // show simple error format for unittest
    if (this.app.meta.isTest) {
      this.ctx.status = status;
      this.ctx.body = `${err.name}: ${err.message}\n${err.stack}`;
      return true;
    }

    this.ctx.body = this.scope.service.errorView.toHTML(err, this._getViewTemplate());

    // handled
    return true;
  }

  private _getViewTemplate() {
    const fileTemplate =
      this.scope.config.error.templatePath || path.join(this.scope.module.root, 'templates/onerror_page.mustache');
    if (!__cacheViewTemplates[fileTemplate]) {
      __cacheViewTemplates[fileTemplate] = fs.readFileSync(fileTemplate, 'utf8');
    }
    return __cacheViewTemplates[fileTemplate];
  }
}
