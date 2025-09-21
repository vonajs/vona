import type { Next } from 'vona';
import type { IDecoratorInterceptorOptionsGlobal, IInterceptorExecute } from 'vona-module-a-aspect';
import type { BodyParserOptions } from '../types/bodyParser.ts';
import { BeanBase } from 'vona';
import { Interceptor } from 'vona-module-a-aspect';

export interface IInterceptorOptionsBodyReq extends IDecoratorInterceptorOptionsGlobal {
  parser: BodyParserOptions;
}

@Interceptor<IInterceptorOptionsBodyReq>({
  global: true,
  dependencies: 'a-openapischema:openapiSchema',
  parser: {
    enableTypes: ['json', 'form'],
    encoding: 'utf8',
    formLimit: '20mb',
    jsonLimit: '20mb',
    textLimit: '20mb',
    xmlLimit: '20mb',
    jsonStrict: true,
    detectJSON: undefined,
    parsedMethods: ['POST', 'PUT', 'PATCH'],
    extendTypes: {},
  },
})
export class InterceptorBodyReq extends BeanBase implements IInterceptorExecute {
  async execute(options: IInterceptorOptionsBodyReq, next: Next) {
    // parse
    await this.bean.bodyReq.parse(options.parser);
    // next
    return next();
  }
}
