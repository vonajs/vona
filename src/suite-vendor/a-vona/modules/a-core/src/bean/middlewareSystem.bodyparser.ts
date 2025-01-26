import { BeanBase, Next } from 'vona';
import { IDecoratorMiddlewareSystemOptions, IMiddlewareSystemExecute, MiddlewareSystem } from 'vona-module-a-aspect';
import bodyparser from 'koa-bodyparser';

export interface IMiddlewareSystemOptionsBodyparser extends IDecoratorMiddlewareSystemOptions {
  enableTypes: string[];
  encoding: string;
  formLimit: string;
  jsonLimit: string;
  textLimit: string;
  xmlLimit: string;
  strict: boolean;
  detectJSON?: Function;
  queryString: {
    arrayLimit: number;
    depth: number;
    parameterLimit: number;
  };
  onerror: Function;
}

@MiddlewareSystem<IMiddlewareSystemOptionsBodyparser>({
  dependencies: 'a-static:static',
  enableTypes: ['json', 'form'],
  encoding: 'utf8',
  formLimit: '20mb',
  jsonLimit: '20mb',
  textLimit: '20mb',
  xmlLimit: '20mb',
  strict: true,
  detectJSON: undefined,
  queryString: {
    arrayLimit: 100,
    depth: 5,
    parameterLimit: 1000,
  },
  onerror(err, ctx) {
    err.message += ', check bodyParser config';
    if (ctx.status === 404) {
      // set default status to 400, meaning client bad request
      ctx.status = 400;
      if (!err.status) {
        err.status = 400;
      }
    }
    throw err;
  },
})
export class MiddlewareSystemBodyparser extends BeanBase implements IMiddlewareSystemExecute {
  private _bodyparser: any;

  async execute(options: IMiddlewareSystemOptionsBodyparser, next: Next) {
    if (!this._bodyparser) {
      this._bodyparser = bodyparser(options);
    }
    return this._bodyparser(this.ctx, next);
  }
}
