import type { IMetaPrintApiPathExecute, IMetaPrintApiPathInfo } from 'vona-module-a-printapipath';
import { BeanBase } from 'vona';
import { Meta } from 'vona-module-a-meta';

@Meta()
export class MetaPrintApiPath extends BeanBase implements IMetaPrintApiPathExecute {
  async execute(): Promise<IMetaPrintApiPathInfo | IMetaPrintApiPathInfo[]> {
    return {
      title: 'home',
      path: `http://localhost:${process.env.SERVER_LISTEN_PORT}`,
    };
  }
}
