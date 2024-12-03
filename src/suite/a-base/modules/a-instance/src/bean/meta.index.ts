import { BeanBase, IMetaOptionsIndex, Meta } from 'vona';

@Meta<IMetaOptionsIndex>({
  indexes: {},
})
export class MetaIndex extends BeanBase {}
