import type { IMetaPrintTipExecute, IMetaPrintTipInfo } from 'vona-module-a-printtip';
import { BeanBase } from 'vona';
import { Meta } from 'vona-module-a-meta';

@Meta()
export class MetaPrintTip extends BeanBase implements IMetaPrintTipExecute {
  async execute(): Promise<IMetaPrintTipInfo | IMetaPrintTipInfo[]> {
    return {
      title: 'home',
      path: `http://localhost:${process.env.SERVER_LISTEN_PORT}`,
    };
  }
}
