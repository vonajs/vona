import { BeanBase } from 'vona';
import { Meta } from 'vona-module-a-meta';
import { IMetaPrintApiPathExecute, IMetaPrintApiPathInfo } from 'vona-module-a-printapipath';
import { apiPath } from 'vona-module-a-web';

@Meta()
export class MetaPrintApiPath extends BeanBase implements IMetaPrintApiPathExecute {
  async execute(): Promise<IMetaPrintApiPathInfo | IMetaPrintApiPathInfo[]> {
    // apiPath
    const _apiPath = this.scope.util.combineApiPath(apiPath('//swagger'));
    return [
      { title: 'swagger', path: `http://localhost:${process.env.SERVER_LISTEN_PORT}${_apiPath}` },
      { title: 'swagger30', path: `http://localhost:${process.env.SERVER_LISTEN_PORT}${_apiPath}?version=30` },
    ];
  }
}
