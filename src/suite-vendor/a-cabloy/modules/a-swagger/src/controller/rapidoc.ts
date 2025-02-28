import { BeanBase } from 'vona';
import { Api, Query, v } from 'vona-module-a-openapi';
import { Public } from 'vona-module-a-user';
import { apiPath, Controller, Get } from 'vona-module-a-web';

const __SWAGGER_HTML__ = `<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <script type="module" src="__SWAGGER_JS__"></script>
  </head>
  <body>
    <rapi-doc spec-url="__SWAGGER_JSON__"></rapi-doc>
  </body>
</html>
`;

@Controller({ path: '//rapidoc', exclude: true, meta: { mode: ['local', 'test'] } })
export class ControllerRapidoc extends BeanBase {
  @Get()
  @Public()
  @Api.contentType('text/html')
  index(@Query('version', v.default('31')) version: string): string {
    const _pathJS = this.scope.util.combineStaticPath('rapidoc-9.3.8/rapidoc-min.js');
    const _pathJSON = this.scope.util.combineApiPath(apiPath('//swagger/json'));
    return __SWAGGER_HTML__
      .replace('__SWAGGER_JS__', _pathJS)
      .replace('__SWAGGER_JSON__', `${_pathJSON}?version=${version}`);
  }
}
