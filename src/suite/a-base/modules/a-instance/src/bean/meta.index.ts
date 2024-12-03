import { BeanBase, IMetaOptionsIndex, Meta } from 'vona';

@Meta<IMetaOptionsIndex>({
  indexes: {
    aInstance: 'name',
  },
})
export class MetaIndex extends BeanBase {}
