import { EntityBase } from 'vona';

export interface EntityMail extends EntityBase {
  scene: string;
  status: number;
  mailTo: string;
  mailSubject: string;
  message: string;
}
