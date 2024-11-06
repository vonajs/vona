import { EntityItemBase } from 'vona-module-a-base';
import { Entity } from 'vona';

@Entity('aResourceLocale')
export class EntityResourceLocale extends EntityItemBase {
  locale: string;
  atomNameLocale: string;
}
