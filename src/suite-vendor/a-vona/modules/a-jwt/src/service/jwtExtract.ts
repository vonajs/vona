import { BeanBase } from 'vona';
import { Service } from 'vona-module-a-web';
import { parseAuthHeader } from '../lib/authHeader.ts';

@Service()
export class ServiceJwtExtract extends BeanBase {
  fromHeader(): string | undefined {
    return this.ctx.request.headers[this.scope.config.field.extract.header] as string | undefined;
  }

  fromQuery() {
    return this.ctx.request.query[this.scope.config.field.extract.query];
  }

  fromAuthHeaderWithScheme() {
    const headerValue = this.ctx.request.headers[this.scope.config.field.extract.headerAuth];
    const auth = parseAuthHeader(headerValue);
    if (!auth || auth.scheme.toLocaleLowerCase() !== this.scope.config.field.extract.headerAuthScheme.toLocaleLowerCase()) return;
    return auth.value;
  }

  fromAllWays() {
    let token: string | undefined = this.fromQuery();
    if (!token) token = this.fromAuthHeaderWithScheme();
    if (!token) token = this.fromHeader();
    return token;
  }
}
