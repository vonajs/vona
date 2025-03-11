import type { IMetaPrintTipExecute, TypeMetaPrintTipResult } from 'vona-module-a-printtip';
import { BeanBase } from 'vona';
import { Meta } from 'vona-module-a-meta';

@Meta()
export class MetaPrintTip extends BeanBase implements IMetaPrintTipExecute {
  async execute(): Promise<TypeMetaPrintTipResult> {
    if (!this.app.meta.isLocal) return;
    // signin
    const jwt = await this.app.bean.executor.newCtx(async () => {
      return await this.bean.passport.signinSystem('dev', '-1');
    }, { instanceName: '' });
    const accessToken = jwt.accessToken;
    return {
      title: 'access token [admin] [dev]',
      path: `Bearer ${accessToken}`,
    };
  }
}
