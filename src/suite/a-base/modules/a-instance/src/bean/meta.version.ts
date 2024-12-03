import { BeanBase, IMetaVersionUpdate, IMetaVersionUpdateOptions, Meta } from 'vona';

@Meta()
export class MetaVersion extends BeanBase implements IMetaVersionUpdate {
  async update(_options: IMetaVersionUpdateOptions) {}
}
