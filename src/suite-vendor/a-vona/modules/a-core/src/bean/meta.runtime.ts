import type { IMetaRuntimeExecute } from 'vona-module-a-runtime';
import { BeanBase } from 'vona';
import { Meta } from 'vona-module-a-meta';

export interface TypeMetaPrintTipResult {
  protocol: string;
  host: string;
}

@Meta()
export class MetaRuntime extends BeanBase implements IMetaRuntimeExecute {
  async execute(): Promise<TypeMetaPrintTipResult> {
    return {
      protocol: this.bean.core.protocol,
      host: this.bean.core.host,
    };
  }
}
