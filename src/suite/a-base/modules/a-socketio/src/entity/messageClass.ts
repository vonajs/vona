import { EntityBase } from 'vona';

export interface EntityMessageClass extends EntityBase {
  module: string;
  messageClassName: string;
  uniform: number;
}
