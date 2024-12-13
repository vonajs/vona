import { EntityItemBase } from 'vona-module-a-base';
import { Entity } from 'vona-module-a-database';

@Entity('aResourceLocale')
export class EntityResourceLocale extends EntityItemBase {
  locale: string;
  atomNameLocale: string;
}
