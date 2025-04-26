import type { IErrorRenderOptions } from '../types/error.ts';
import fs from 'node:fs';
import { BeanBase } from 'vona';
import { Bean } from 'vona-module-a-bean';
import { __ThisModule__ } from '../.metadata/this.ts';

const __cacheViewTemplates: Record<string, any> = {};

@Bean()
export class BeanError extends BeanBase {
  async render(err: Error, options?: IErrorRenderOptions) {
    const html = this.scope.service.errorView.toHTML(err, this._getViewTemplate());
    if (options?.returnHtml) return html;
    this.ctx.res.statusCode = 200;
    this.ctx.res.setHeader('Content-Type', 'text/html');
    this.ctx.res.end(html);
  }

  private _getViewTemplate() {
    const fileTemplate =
      this.scope.config.error.templatePath || this.app.util.getAssetPathPhysical(__ThisModule__, 'templates', 'onerror_page.mustache')!;
    if (!__cacheViewTemplates[fileTemplate]) {
      __cacheViewTemplates[fileTemplate] = fs.readFileSync(fileTemplate, 'utf8');
    }
    return __cacheViewTemplates[fileTemplate];
  }
}
