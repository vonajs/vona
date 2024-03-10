import { EntityBase } from '@cabloy/core';

export interface EntityUserRole extends EntityBase {
  userId: number;
  roleId: number;
}
