import type { IMetaPrintApiPathExecute, IMetaPrintApiPathInfo } from 'vona-module-a-printapipath';
import { BeanBase } from 'vona';
import { Meta } from 'vona-module-a-meta';

@Meta()
export class MetaPrintApiPath extends BeanBase implements IMetaPrintApiPathExecute {
  async execute(): Promise<IMetaPrintApiPathInfo | IMetaPrintApiPathInfo[]> {
    // signin
    const jwt = await this.app.bean.executor.newCtx(async () => {
      return await this.bean.passport.signinSystem('dev', '-1');
    }, { instanceName: '' });
    const accessToken = jwt.accessToken;
    return {
      title: 'access token',
      path: `Bearer ${accessToken}`,
    };
  }
}
