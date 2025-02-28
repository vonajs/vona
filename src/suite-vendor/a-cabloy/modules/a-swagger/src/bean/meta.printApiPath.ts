import type { IMetaPrintApiPathExecute, IMetaPrintApiPathInfo } from 'vona-module-a-printapipath';
import { BeanBase } from 'vona';
import { Meta } from 'vona-module-a-meta';
import { apiPath } from 'vona-module-a-web';

@Meta()
export class MetaPrintApiPath extends BeanBase implements IMetaPrintApiPathExecute {
  async execute(): Promise<IMetaPrintApiPathInfo | IMetaPrintApiPathInfo[]> {
    // apiPath
    const _apiPathSwagger = this.scope.util.combineApiPath(apiPath('//swagger'));
    const _apiPathRapidoc = this.scope.util.combineApiPath(apiPath('//rapidoc'));
    return [
      { title: 'swagger', path: `http://localhost:${process.env.SERVER_LISTEN_PORT}${_apiPathSwagger}` },
      // { title: 'swagger30', path: `http://localhost:${process.env.SERVER_LISTEN_PORT}${_apiPathSwagger}?version=30` },
      { title: 'rapidoc', path: `http://localhost:${process.env.SERVER_LISTEN_PORT}${_apiPathRapidoc}` },
      // { title: 'rapidoc30', path: `http://localhost:${process.env.SERVER_LISTEN_PORT}${_apiPathRapidoc}?version=30` },
    ];
  }
}
