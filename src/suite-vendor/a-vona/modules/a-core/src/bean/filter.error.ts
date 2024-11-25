import { BeanBase, Cast, Filter, IDecoratorFilterOptionsGlobal, IFilterJson, NextSync } from 'vona';

export interface IFilterOptionsError extends IDecoratorFilterOptionsGlobal {}

@Filter<IFilterOptionsError>({ global: true })
export class FilterError extends BeanBase implements IFilterJson {
  json(err: Error, _options: IFilterOptionsError, next: NextSync): boolean {
    // next
    const res = next();
    if (res === false) return false;

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
        if (!errorJson[key]) {
          errorJson[key] = err[key];
        }
      }
    }

    this.ctx.body = errorJson;
    return false;
  }
}
