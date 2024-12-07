import { BeanBase, Meta } from 'vona';

@Meta()
export class MetaStatus extends BeanBase {
  get(name: string) {
    return name;
  }
}
