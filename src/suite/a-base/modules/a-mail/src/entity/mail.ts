import { EntityBaseTemp } from 'vona-module-a-base';

export interface EntityMail extends EntityBaseTemp {
  scene: string;
  status: number;
  mailTo: string;
  mailSubject: string;
  message: string;
}
