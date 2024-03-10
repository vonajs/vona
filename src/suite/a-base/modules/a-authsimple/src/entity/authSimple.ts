import {} from '@cabloy/core';

export interface EntityAuthSimple extends EntityBase {
  userId: number;
  hash: string;
}
