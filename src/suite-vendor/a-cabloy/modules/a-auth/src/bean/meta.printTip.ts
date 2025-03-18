import type { IMetaPrintTipExecute, TypeMetaPrintTipResult } from 'vona-module-a-printtip';
import { BeanBase } from 'vona';
import { Meta } from 'vona-module-a-meta';
import { $apiPath } from 'vona-module-a-web';

@Meta()
export class MetaPrintTip extends BeanBase implements IMetaPrintTipExecute {
  async execute(): Promise<TypeMetaPrintTipResult> {
    const _apiPath = this.scope.util.combineApiPath($apiPath('/auth/passport/callback'));
    return {
      title: 'passport callback',
      path: `http://localhost:${process.env.SERVER_LISTEN_PORT}${_apiPath}`,
    };
  }
}
