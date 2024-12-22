import { BeanBase } from 'vona';
import { Public } from 'vona-module-a-user';
import { Controller, Get, Res } from 'vona-module-a-web';

const __SWAGGER_HTML__ = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="description" content="SwaggerUI" />
  <title>SwaggerUI</title>
  <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@5.11.0/swagger-ui.css" />
</head>
<body>
<div id="swagger-ui"></div>
<script src="https://unpkg.com/swagger-ui-dist@5.11.0/swagger-ui-bundle.js" crossorigin></script>
<script>
  window.onload = () => {
    window.ui = SwaggerUIBundle({
      url: '__SWAGGER_JSON__',
      dom_id: '#swagger-ui',
    });
  };
</script>
</body>
</html>`;

@Controller('//swagger')
export class ControllerSwagger extends BeanBase {
  @Get()
  @Public()
  @Res.contentType('text/html')
  index() {
    return __SWAGGER_HTML__;
  }

  @Get('json')
  @Public()
  @Res.contentType('text/plain')
  json() {
    const json = this.scope.service.swagger.generateJson();
    return JSON.stringify(json, null, 2);
  }
}
