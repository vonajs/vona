import { EntityBaseTemp } from 'vona-module-a-base';
import { Entity } from 'vona-module-a-database';

@Entity('aMail')
export class EntityMail extends EntityBaseTemp {
  scene: string;
  status: number;
  mailTo: string;
  mailSubject: string;
  message: string;
}
