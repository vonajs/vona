import type { IMetaPrintTipExecute, TypeMetaPrintTipResult } from 'vona-module-a-printtip';
import { BeanBase } from 'vona';
import { Meta } from 'vona-module-a-meta';
import { $apiPath } from 'vona-module-a-web';

@Meta()
export class MetaPrintTip extends BeanBase implements IMetaPrintTipExecute {
  async execute(): Promise<TypeMetaPrintTipResult> {
    // apiPath
    const _apiPathSwagger = this.app.util.getAbsoluteUrlByApiPath($apiPath('//swagger'));
    const _apiPathRapidoc = this.app.util.getAbsoluteUrlByApiPath($apiPath('//rapidoc'));
    return [
      { title: 'swagger', path: _apiPathSwagger },
      // { title: 'swagger30', path: `http://localhost:${process.env.SERVER_LISTEN_PORT}${_apiPathSwagger}?version=30` },
      { title: 'rapidoc', path: _apiPathRapidoc },
      // { title: 'rapidoc30', path: `http://localhost:${process.env.SERVER_LISTEN_PORT}${_apiPathRapidoc}?version=30` },
    ];
  }
}
