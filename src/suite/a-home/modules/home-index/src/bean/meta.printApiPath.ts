import { BeanBase } from 'vona';
import { Meta } from 'vona-module-a-meta';
import { IMetaPrintApiPathExecute, IMetaPrintApiPathInfo } from 'vona-module-a-printapipath';

@Meta()
export class MetaPrintApiPath extends BeanBase implements IMetaPrintApiPathExecute {
  async execute(): Promise<IMetaPrintApiPathInfo | IMetaPrintApiPathInfo[]> {
    return {
      title: 'home api',
      path: `http://localhost:${process.env.SERVER_LISTEN_PORT}`,
    };
  }
}
