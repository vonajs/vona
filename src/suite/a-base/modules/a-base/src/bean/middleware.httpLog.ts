import { BeanBase } from 'vona';
import { Middleware } from 'vona-module-a-aspect';

@Middleware()
export class MiddlewareHttpLog extends BeanBase {
  async execute(_options, next) {
    await next();

    // check if log
    const _config = this.scope.config;
    if (!_config.httpLog) return;

    //
    const req = this.ctx.request;
    const res = this.ctx.response;

    // check if json
    if (res.type.indexOf('application/json') === -1) return;

    // log
    let log = '\n';
    // query
    if (req.query && Object.keys(req.query).length > 0) {
      log = `${log}query:
  ${JSON.stringify(req.query)}
`;
    }
    // params
    const params = this.ctx.params;
    if (params && Object.keys(params).length > 0) {
      log = `${log}params:
  ${JSON.stringify(params)}
`;
    }
    // body
    if (req.body && Object.keys(req.body).length > 0) {
      log = `${log}body:
  ${JSON.stringify(req.body)}
`;
    }
    // res
    log = `${log}response:
  ${JSON.stringify(res.body)}
`;
    // log
    this.ctx.logger.info(log);
  }
}
