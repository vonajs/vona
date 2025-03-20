import type { IOpenAPIObject } from 'vona-module-a-openapi';
import { BeanBase } from 'vona';
import { Api, Query, v } from 'vona-module-a-openapi';
import { Public } from 'vona-module-a-user';
import { $apiPath, Controller, Get } from 'vona-module-a-web';

const __SWAGGER_HTML__ = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="description" content="SwaggerUI" />
  <title>SwaggerUI</title>
  <link rel="stylesheet" type="text/css" href="__SWAGGER_UI__" />
  <link rel="stylesheet" type="text/css" href="__SWAGGER_CSS__" />
</head>
<body>
  <div id="swagger-ui"></div>
  <script src="__SWAGGER_JS__" charset="UTF-8" crossorigin></script>
  <script>
    window.onload = () => {
      window.ui = SwaggerUIBundle({
        url: '__SWAGGER_JSON__',
        dom_id: '#swagger-ui',
        onComplete: function() {
          window.ui.preauthorizeApiKey('bearerAuth', '__SWAGGER_ACCESSTOKEN__');
        },
      });
    };
  </script>
</body>
</html>
`;

@Controller({ path: '//swagger', exclude: true, meta: { mode: ['local', 'test'] } })
export class ControllerSwagger extends BeanBase {
  @Web.get()
  @Public()
  @Api.contentType('text/html')
  async index(@Query('version', v.default('31')) version: string): Promise<string> {
    // signin
    let accessToken = '';
    if (this.app.meta.isLocal || this.app.meta.isTest) {
      const jwt = await this.bean.passport.signinSystem('swagger', '-2');
      accessToken = jwt.accessToken;
    }
    // ui
    const _pathUI = this.scope.util.combineStaticPath('swagger-ui-5.18.2/swagger-ui.css');
    const _pathCSS = this.scope.util.combineStaticPath('swagger-ui-5.18.2/index.css');
    const _pathJS = this.scope.util.combineStaticPath('swagger-ui-5.18.2/swagger-ui-bundle.js');
    const _pathJSON = this.scope.util.combineApiPath($apiPath('//swagger/json'));
    return __SWAGGER_HTML__
      .replace('__SWAGGER_ACCESSTOKEN__', accessToken)
      .replace('__SWAGGER_UI__', _pathUI)
      .replace('__SWAGGER_CSS__', _pathCSS)
      .replace('__SWAGGER_JS__', _pathJS)
      .replace('__SWAGGER_JSON__', `${_pathJSON}?version=${version}`);
  }

  @Web.get('json')
  @Public()
  @Api.contentType('text/plain')
  json(@Query('version', v.default('31')) version: string): string {
    const json = this.$scope.openapi.service.openapi.generateJson(version as unknown as keyof IOpenAPIObject);
    return JSON.stringify(json, null, 2);
  }
}
